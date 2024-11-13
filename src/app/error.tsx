'use client'
import Image from 'next/image'
import styles from 'app/scss/error-global.module.scss'
import { Button } from 'app/components/shared/Button/Button'
import Title from 'app/components/shared/Title/Title'

export default function GlobalError({ reset }: ErrorPageProps) {
  return (
    <main className={styles.Error}>
      <Title variant="subtitle" className={styles.Error__title}>
        An error has occurred
      </Title>
      <Image src="/images/error.png" width={300} height={300} alt="Error" />
      <p className={styles.Error__message}>
        It seems an error has occurred, but don&apos;t feel bad
      </p>
      <Button className={styles.Error__button} onClick={reset}>
        Try again
      </Button>
    </main>
  )
}
