'use client'
import { handleLogin } from 'app/actions'
import styles from './LoginForm.module.scss'
import Link from 'next/link'
import { Button } from '../shared/Button/Button'
import { ToastType, useToastStore } from 'app/hooks/useToastStore'
import { useFormik } from 'formik'

export const LoginForm = () => {
  const { showToast } = useToastStore()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: LoginData) => {
      try {
        await handleLogin(values)
      } catch (error) {
        showToast('An error occurred while trying to log in', ToastType.rejected)
      }
    },
  })

  return (
    <div className={styles.NewAccountForm}>
      <h1 className={styles.NewAccountForm__title}>Login</h1>
      <div className={styles.NewAccountForm__signup}>
        <p>Don&apos;t have an account?</p>
        <Link href="/signin">
          <Button variant="link">Sign up</Button>
        </Link>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className={styles.NewAccountForm__form}
        autoComplete="off"
      >
        <input
          type="text"
          name="email"
          placeholder="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onChange={formik.handleChange}
          value={formik.values.email}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          autoComplete="off"
        />
        <input type="submit" name="submit" value="Login" />
      </form>
    </div>
  )
}
