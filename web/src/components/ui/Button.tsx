import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark border border-transparent',
  secondary:
    'bg-accent text-white hover:bg-accent-dark border border-transparent',
  outline:
    'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white',
  'outline-white':
    'bg-transparent text-white border border-white hover:bg-white hover:text-primary',
  ghost:
    'bg-transparent text-primary border border-transparent hover:bg-primary/10',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-8 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
};

const baseClasses =
  'inline-flex items-center justify-center font-medium tracking-widest transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
