'use client'
import styles from './Description.module.scss'
import Image from 'next/image'
import { DESCRIPTION_BLUR_DATA_URL } from '../../../utils/blurUrls'
import { useState } from 'react'
import classNames from 'classnames/bind'
import Title from 'app/components/shared/Title/Title'

export const Description = () => {
  const [hasBorder, setHasBorder] = useState(false)

  const handleIamgeClick = () => {
    setHasBorder(prevState => !prevState)
  }

  const cx = classNames.bind(styles)

  const buttonStyles = cx('Description__button', {
    'Description__button--border': hasBorder,
  })

  return (
    <section className={styles.Description}>
      <Title variant="subtitle" className={styles.Description__title}>
        About us
      </Title>
      <div className={styles.Description__Container}>
        <button className={buttonStyles} onClick={handleIamgeClick}>
          <div className={styles.Description__imageContainer}>
            <Image
              src="/images/description.jpeg"
              alt="products marketplace"
              fill
              placeholder="blur"
              blurDataURL={DESCRIPTION_BLUR_DATA_URL}
            />
          </div>
        </button>

        <div className={styles.Description__text}>
          <h2>Bring the future today</h2>
          <p>
            Your Gateway to Tomorrow&apos;s Tech! Dive into a world of cutting-edge gadgets and
            gear. Stay ahead of the curve and redefine your digital lifestyle with us.
          </p>
        </div>
      </div>
    </section>
  )
}
