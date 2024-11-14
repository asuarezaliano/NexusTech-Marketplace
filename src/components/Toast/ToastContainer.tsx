'use client'

import { useToastStore } from 'app/hooks/useToastStore'
import Toast from './Toast'

export default function ToastContainer() {
  const { isVisible, message, type, hideToast } = useToastStore()

  return <Toast isVisible={isVisible} message={message} type={type} onClose={hideToast} />
}
