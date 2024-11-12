import { FC, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: 'button' | 'link'
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({
  href,
  variant = 'button',
  className = '',
  children,
  onClick,
  ...props
}) => {
  if (variant === 'link' && href) {
    return (
      <Link href={href} className={`${styles.button} ${className}`} data-variant="link">
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  )
}
