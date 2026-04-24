const siteUrl = process.env.NEXT_PUBLIC_MOCK_SITE_URL ?? '';

let basePath = '';

if (siteUrl) {
  try {
    const pathname = new URL(siteUrl).pathname.replace(/\/$/, '');
    if (pathname && pathname !== '/') {
      basePath = pathname;
    }
  } catch {
    basePath = '';
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
