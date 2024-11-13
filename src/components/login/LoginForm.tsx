'use client'
import { handleLogin } from 'app/actions'
import styles from './LoginForm.module.scss'
import Link from 'next/link'
import { Button } from '../shared/Button/Button'

export const LoginForm = () => {
  const handleSubmit = async (event: any) => {
    const formData = new FormData(event.target)
    event.preventDefault()
    await handleLogin(formData)
  }

  return (
    <div className={styles.NewAccountForm}>
      <h1 className={styles.NewAccountForm__title}>Login</h1>
      <div className={styles.NewAccountForm__signup}>
        <p>Don&apos;t have an account?</p>
        <Link href="/signin">
          <Button variant="link">Sign up</Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.NewAccountForm__form}>
        <input
          type="text"
          name="email"
          placeholder="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" name="submit" value="Login" />
      </form>
    </div>
  )
}
