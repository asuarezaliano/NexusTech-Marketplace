import { create } from 'zustand'

interface NavegationHistory {
  path: string
  addPath: (path: string) => void
}

const saveToLocalStorage = (path: string) => {
  localStorage.setItem('navegationHistory', JSON.stringify(path))
}

export const useNavegationHistory = create<NavegationHistory>(set => ({
  path: (() => {
    if (typeof window !== 'undefined') {
      const path = localStorage.getItem('navegationHistory')
      return path ?? ''
    }
    return ''
  })(),
  addPath: (path: string) =>
    set(() => {
      saveToLocalStorage(path)
      return {
        path,
      }
    }),
}))
