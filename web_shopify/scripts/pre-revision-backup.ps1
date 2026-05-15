param(
    [string]$Env = "local"
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$themeDir  = Split-Path -Parent $scriptDir
$repoRoot  = Split-Path -Parent $themeDir

Set-Location $themeDir

if ($Env -eq "production") {
    $envFile  = ".env"
    $envLabel = "production"
} else {
    $envFile  = ".env.local"
    $envLabel = "local"
}

$envPath = Join-Path $repoRoot "env\shopify\$envFile"

if (-not (Test-Path $envPath)) {
    Write-Error "env file not found: $envPath"
    exit 1
}

$themeId        = $null
$cliThemeToken  = $null
$storeDomain    = $null

foreach ($line in Get-Content $envPath -Encoding UTF8) {
    if ($line -match "^SHOPIFY_THEME_ID\s*=\s*(.+)$")           { $themeId       = $Matches[1].Trim() }
    if ($line -match "^SHOPIFY_CLI_THEME_TOKEN\s*=\s*(.+)$")    { $cliThemeToken = $Matches[1].Trim() }
    if ($line -match "^SHOPIFY_STORE_DOMAIN\s*=\s*(.+)$")       { $storeDomain   = $Matches[1].Trim() }
}

if (-not $themeId) {
    Write-Error "SHOPIFY_THEME_ID is not set in $envFile"
    exit 1
}

# セッションに未設定の場合のみ env ファイルの値を補完する（上書きしない）
if (-not $env:SHOPIFY_CLI_THEME_TOKEN -and $cliThemeToken) {
    $env:SHOPIFY_CLI_THEME_TOKEN = $cliThemeToken
}
if (-not $env:SHOPIFY_FLAG_STORE -and $storeDomain) {
    $env:SHOPIFY_FLAG_STORE = $storeDomain
}

$dateStr = Get-Date -Format "yyyy-MM-dd"

Write-Host ""
Write-Host "=== pre-revision backup ===" -ForegroundColor Cyan
Write-Host "env     : $envLabel ($envFile)" -ForegroundColor Cyan
Write-Host "themeId : $themeId"             -ForegroundColor Cyan
Write-Host "date    : $dateStr"             -ForegroundColor Cyan
Write-Host ""

# STEP 1: theme pull
Write-Host "[STEP 1/3] shopify theme pull ..." -ForegroundColor Yellow
$ErrorActionPreference = "Continue"
shopify theme pull --theme $themeId
$step1Exit = $LASTEXITCODE
$ErrorActionPreference = "Stop"
if ($step1Exit -ne 0) {
    Write-Error "theme pull failed (exit $step1Exit)"
    exit 1
}
Write-Host "  done: theme files updated" -ForegroundColor Green

# STEP 2: data backup
Write-Host ""
Write-Host "[STEP 2/3] data backup ..." -ForegroundColor Yellow

$ErrorActionPreference = "Continue"
if ($Env -eq "production") {
    node "$themeDir\scripts\backup-shopify.mjs" --env=production
} else {
    node "$themeDir\scripts\backup-shopify.mjs"
}
$step2Exit = $LASTEXITCODE
$ErrorActionPreference = "Stop"

if ($step2Exit -ne 0) {
    Write-Error "backup script failed (exit $step2Exit)"
    exit 1
}
Write-Host "  done: saved to web_shopify/backup/" -ForegroundColor Green

# STEP 3: git commit
Write-Host ""
Write-Host "[STEP 3/3] git commit ..." -ForegroundColor Yellow

Set-Location $repoRoot

$commitMsg = "backup: pre-revision snapshot $dateStr ($envLabel)"

$ErrorActionPreference = "Continue"
git add web_shopify/
git commit -m $commitMsg
$step3Exit = $LASTEXITCODE
$ErrorActionPreference = "Stop"

if ($step3Exit -ne 0) {
    Write-Host "  warning: nothing to commit or git commit failed" -ForegroundColor DarkYellow
} else {
    Write-Host "  done: $commitMsg" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== backup complete ===" -ForegroundColor Cyan
Write-Host "saved : web_shopify/backup/" -ForegroundColor Cyan
Write-Host "check : git log --oneline -3" -ForegroundColor Cyan
Write-Host ""
