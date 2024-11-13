import { create } from 'zustand'

type Store = {
  cart: {
    items: CartItem[]
    total: number
  }
  addToCart: (cartItem: CartItem) => void
  removeCartItem: (cartItem: CartItem) => void
}

const saveArrayToLocalStorage = (cart: { items: CartItem[]; total: number }) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const calculateTotal = (cart: { items: CartItem[]; total: number }) => {
  const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  return total
}

export const useShoppingCart = create<Store>()(set => ({
  cart: (() => {
    if (typeof window === 'undefined') {
      return {
        items: [],
        total: 0,
      }
    }

    const cart = localStorage.getItem('cart')
    if (cart) {
      return JSON.parse(cart)
    }

    return {
      items: [],
      total: 0,
    }
  })(),
  addToCart: (cartItem: CartItem) =>
    set(state => {
      let currentCart = state.cart
      const itemExists = currentCart.items.find(item => item.id === cartItem.id)

      if (itemExists) {
        const replaceExistingItem = currentCart.items.map(item => {
          if (item.id === cartItem.id) {
            return cartItem
          }
          return item
        })
        currentCart.items = replaceExistingItem
      } else {
        currentCart.items = [...state.cart.items, cartItem]
      }
      currentCart.total = calculateTotal(currentCart)
      saveArrayToLocalStorage(currentCart)
      return { cart: currentCart }
    }),
  removeCartItem: (cartItem: CartItem) =>
    set(state => {
      let currentCart = state.cart
      const newCart = currentCart.items.filter(item => item.id !== cartItem.id)
      currentCart.items = newCart
      currentCart.total = calculateTotal(currentCart)
      saveArrayToLocalStorage(currentCart)
      return { cart: currentCart }
    }),
}))
