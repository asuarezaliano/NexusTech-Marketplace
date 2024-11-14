'use client'
import Image from 'next/image'
import { ProductViewItemsOrder } from './ProductViewItemOrder'
import styles from './ProductView.module.scss'
import { useRouter } from 'next/navigation'
import { SanitizeHTML } from 'app/components/shared/Sanitize'
import Link from 'next/link'
import { Button } from 'app/components/shared/Button/Button'
import { useNavegationHistory } from 'app/hooks/useNavegationHistory'

interface ProductViewProps {
  product: ProductType
}

export const ProductView = ({ product }: ProductViewProps) => {
  const router = useRouter()
  const { path } = useNavegationHistory()

  if (!product) router.push('/store')

  return (
    <main className={styles.Container}>
      <Link href={path}>
        <Button variant="link">Back to store</Button>
      </Link>
      <div className={styles.ProductView}>
        <section className={styles.ProductView__images}>
          <Image
            loading="eager"
            src={product.image}
            width={500}
            height={500}
            quality={80}
            alt={product.title}
          />
        </section>
        <section className={styles.ProductView__info}>
          <h1 className={styles.ProductView__info__title}>{product.title}</h1>
          <p className={styles.ProductView__info__category}>{product.tags}</p>
          <SanitizeHTML tag="p" className={styles.ProductView__info__description}>
            {product.description}
          </SanitizeHTML>
          <span className={styles.ProductView__info__price}>$ {product.price}</span>
          <ProductViewItemsOrder maxQuantity={product.quantity} product={product} />
        </section>
      </div>
    </main>
  )
}
