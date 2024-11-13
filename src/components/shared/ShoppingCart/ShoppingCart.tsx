'use client'
import { useRef, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useShoppingCart } from 'app/hooks/useShoppingCart'
import { ShoppingCartItem } from './ShoppingCartItem'
import { handleCreateCart } from 'app/actions'
import styles from './ShoppingCart.module.scss'
import Link from 'next/link'
import { useWindowSize } from 'app/hooks/useWindowResize'
import { useClickOutside } from 'app/hooks/useClickOutside'

export default function ShoppingCart() {
  const { cart } = useShoppingCart()
  const [isOpen, setIsOpen] = useState(false)
  const { width } = useWindowSize()
  const hasItems = cart.items.length > 0
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => setIsOpen(false), isOpen)

  const handleOpen = () => {
    if (hasItems) {
      setIsOpen(!isOpen)
    }
  }

  if (width <= 900) {
    return (
      <Link href="/cart" className={styles.ShoppingCart}>
        {hasItems && <span className={styles.ShoppingCart__counter}>{cart.items.length}</span>}
        <button className={styles.ShoppingCart__cart} onClick={handleOpen}>
          <FaShoppingCart />
        </button>
      </Link>
    )
  }

  return (
    <div className={styles.ShoppingCart}>
      {hasItems && <span className={styles.ShoppingCart__counter}>{cart.items.length}</span>}
      <button className={styles.ShoppingCart__cart} onClick={handleOpen}>
        <FaShoppingCart />
      </button>
      {isOpen && hasItems && (
        <div ref={modalRef} className={styles.ShoppingCart__items}>
          {cart.items.map(item => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <Link href="/cart">
            <button className={styles.ShoppingCart__buyButton} onClick={() => setIsOpen(false)}>
              Buy
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
