import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'lime' | 'outline-dark' | 'outline-light' | 'outline-sm'

const styles: Record<Variant, string> = {
  lime: 'bg-lime text-ink px-[18px] py-[14px] text-base hover:bg-ink hover:text-lime',
  'outline-dark': 'border border-ink text-ink px-8 py-5 text-[20px] hover:bg-ink hover:text-paper',
  'outline-light': 'border border-paper text-paper px-8 py-5 text-[20px] hover:bg-paper hover:text-ink',
  'outline-sm': 'border border-ink text-ink px-[18px] py-3 text-[14px] !font-sans !font-normal hover:bg-ink hover:text-paper',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; to?: string }

/** Pill CTA. Pass `to` for an in-app route (react-router Link), `href` for anything else. */
export function PillButton({ variant = 'lime', className = '', children, to, ...rest }: Props) {
  const cls = `inline-flex items-center justify-center rounded-full font-display font-medium leading-none whitespace-nowrap transition-[background-color,color,transform] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${styles[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a className={cls} {...rest}>
      {children}
    </a>
  )
}
