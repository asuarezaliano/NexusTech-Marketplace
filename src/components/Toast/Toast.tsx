'use client'
import { useEffect } from 'react'
import styles from './Toast.module.scss'

interface ToastProps {
  type: 'accepted' | 'rejected'
  message: string
  onClose: () => void
  isVisible: boolean
}

const Toast = ({ type, message, onClose, isVisible }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 20000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <p className={styles.message}>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </div>
  )
}

export default Toast
