'use client'
import Title from 'app/components/shared/Title/Title'
import styles from './Hero.module.scss'
import Image from 'next/image'
import { TbSquareArrowDownFilled } from 'react-icons/tb'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className={styles.Hero}>
      <div className={styles.background} />
      <div className={styles.Hero__TItleContainer}>
        <Title variant="title" className={styles.title}>
          Nexus Tech
        </Title>
        <Title as="h2" variant="small" className={styles.subtitle}>
          Tomorrow&apos;s Tech, Today&apos;s Reality
        </Title>
        <div className={styles.scrollButtonContainer}>
          <Link
            href="#main-products"
            className={styles.scrollButton}
            scroll={false}
            onClick={e => {
              e.preventDefault()
              document.getElementById('main-products')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            <TbSquareArrowDownFilled />
          </Link>
        </div>
      </div>
    </section>
  )
}
