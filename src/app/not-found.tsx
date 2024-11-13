import Image from 'next/image'
import Link from 'next/link'
import styles from 'app/scss/not-found.module.scss'
import { Button } from 'app/components/shared/Button/Button'
import Title from 'app/components/shared/Title/Title'

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <Title variant="title" className={styles.NotFound__title}>
        404
      </Title>
      <Image src="/images/404.png" alt="404" width={300} height={300} />
      <h2 className={styles.NotFound__subtitle}>Oops, looks like the link is hiding!</h2>
      <p className={styles.NotFound__description}>But our store is open 24/7</p>
      <Link href="/store" className={styles.NotFound__link}>
        <Button>Let&apos;s go shopping!</Button>
      </Link>
    </main>
  )
}
