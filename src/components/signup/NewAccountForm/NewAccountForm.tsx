'use client'
import { useState } from 'react'
import styles from './NewAccountForm.module.scss'
import { handleCreateUser } from 'app/actions'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const NewAccountForm = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]*$/, 'Phone number must contain only numbers')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true)
      try {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value)
        })
        await handleCreateUser(formData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className={styles.NewAccountForm}>
      <h1 className={styles.NewAccountForm__title}>New Account</h1>
      <form className={styles.NewAccountForm__form} onSubmit={formik.handleSubmit}>
        <div id="firstName">
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            disabled={loading}
          />
          <p className={styles.NewAccountForm__error}>
            {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
          </p>
        </div>
        <div id="lastName">
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            disabled={loading}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className={styles.NewAccountForm__error}>{formik.errors.lastName}</p>
          )}
        </div>
        <div id="email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="off"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            disabled={loading}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.NewAccountForm__error}>{formik.errors.email}</p>
          )}
        </div>
        <div id="phone">
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            pattern="^[0-9]*$"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            disabled={loading}
          />

          <p className={styles.NewAccountForm__error}>
            {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
          </p>
        </div>
        <div id="password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            disabled={loading}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={styles.NewAccountForm__error}>{formik.errors.password}</p>
          )}
        </div>
        <div id="password_confirmation">
          <input
            type="Password"
            name="password_confirmation"
            placeholder="Re-type password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
            disabled={loading}
          />
          {formik.touched.password_confirmation && formik.errors.password_confirmation && (
            <p className={styles.NewAccountForm__error}>{formik.errors.password_confirmation}</p>
          )}
        </div>

        <input type="submit" name="submit" value="Create account" disabled={loading} />
      </form>
    </div>
  )
}
