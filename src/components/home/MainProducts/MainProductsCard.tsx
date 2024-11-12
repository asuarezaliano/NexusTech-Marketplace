import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './MainProductsCard.module.scss'

interface MainProductsCardProps {
  id: string
  title: string
  image: string
}

export const MainProductsCard: React.FC<MainProductsCardProps> = ({ title, image, id }) => {
  return (
    <Link href={`/product/${id}`}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    </Link>
  )
}
