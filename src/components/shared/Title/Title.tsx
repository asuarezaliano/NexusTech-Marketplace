import React from 'react'
import styles from './Title.module.scss'
import classNames from 'classnames'

type TitleVariant = 'title' | 'subtitle' | 'small'

interface TitleProps {
  variant?: TitleVariant
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title: React.FC<TitleProps> = ({
  variant = 'title',
  children,
  className,
  as: Component = 'h1',
}) => {
  return (
    <Component className={classNames(styles.title, styles[`variant_${variant}`], className)}>
      {children}
    </Component>
  )
}

export default Title
