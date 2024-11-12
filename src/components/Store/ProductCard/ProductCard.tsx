import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductCard.module.scss'
import { stripHtmlTags } from 'app/utils/fixHtmls'

interface ProductCardInterface {
  product: ProductType
}

export const ProductCard = ({ product }: ProductCardInterface) => {
  return (
    <Link href={`/product/${product.handle}?id=${product.id}`} className={styles.ProductCard__link}>
      <article className={styles.ProductCard}>
        <div className={styles.ProductCard__imageContainer}>
          <Image
            src={product.image}
            alt={product.title}
            quality={80}
            height={320}
            width={320}
            loading="eager"
          />
        </div>
        <div className={styles.ProductCard__info}>
          <h3 className={styles.ProductCard__title}>{product.title}</h3>
          <p className={styles.ProductCard__description}>
            {stripHtmlTags(product.description.substring(0, 100))}...
          </p>
          <div className={styles.ProductCard__footer}>
            <span className={styles.ProductCard__price}>${product.price} USD</span>
            <span className={styles.ProductCard__seller}>{product.vendor}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
