'use client'
import { FC, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Cart.module.scss'
import { useShoppingCart } from 'app/hooks/useShoppingCart'
import { handleCreateCart } from 'app/actions'
import { Button } from 'app/components/shared/Button/Button'
import Title from '../shared/Title/Title'
import { stripHtmlTags } from 'app/utils/fixHtmls'
import { ImCross } from 'react-icons/im'

export const Cart: FC = () => {
  const { cart, removeCartItem } = useShoppingCart()
  const [isBuying, setIsBuying] = useState(false)

  const handleBuy = async () => {
    try {
      setIsBuying(true)
      const checkoutUrl = await handleCreateCart(cart.items)
      if (!checkoutUrl) throw new Error('Error creating checkout')
      window.localStorage.removeItem('cart')
      window.location.href = checkoutUrl
    } catch (error) {
      console.log(error)
    } finally {
      setIsBuying(false)
    }
  }

  return (
    <div className={styles.cartContainer}>
      <Title variant="subtitle" className={styles.cartTitle}>
        Cart
      </Title>
      <div className={styles.cartContent}>
        <div className={styles.productList}>
          {cart.items.map(item => (
            <Link href={`/product/${item.id}`} key={item.id} className={styles.productRow}>
              <button
                className={styles.removeButton}
                onClick={e => {
                  e.preventDefault()
                  removeCartItem(item)
                }}
              >
                <ImCross />
              </button>
              <Image
                src={item.image}
                alt={item.image}
                width={100}
                height={100}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h3>{item.title}</h3>
                <p>{stripHtmlTags(item.description)}</p>
              </div>
              <div className={styles.productPriceWrapper}>
                <div className={styles.priceContent}>
                  <span>Quantity: {item.quantity}</span>
                  <div className={styles.productPrice}>{item.price * item.quantity} USD</div>
                </div>
              </div>
            </Link>
          ))}
          <div className={styles.cartSummary}>
            <div className={styles.totalAmount}>
              <h3>Total</h3>
              <span>{cart.total}USD</span>
            </div>
            <Button className={styles.checkoutButton} onClick={handleBuy} disabled={isBuying}>
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
