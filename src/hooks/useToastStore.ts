import { create } from 'zustand'

export enum ToastType {
  accepted = 'accepted',
  rejected = 'rejected',
}

interface ToastState {
  isVisible: boolean
  message: string
  type: ToastType
  showToast: (message: string, type: ToastType) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>(set => ({
  isVisible: false,
  message: '',
  type: ToastType.accepted,
  showToast: (message, type) => set({ isVisible: true, message, type }),
  hideToast: () => set({ isVisible: false }),
}))
