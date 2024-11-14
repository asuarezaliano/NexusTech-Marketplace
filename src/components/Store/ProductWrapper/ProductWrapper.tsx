import { ProductCard } from '../ProductCard'
import styles from './ProductWrapper.module.scss'

interface ProductsWrapperProps {
  products: ProductType[]
  currentPath: string
}

export const ProductsWrapper = ({ products, currentPath }: ProductsWrapperProps) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} currentPath={currentPath} />
      ))}
    </div>
  )
}
