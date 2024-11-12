import { ServiceProducts } from 'app/services/shopify/porducts'
import styles from './MainProducts.module.scss'
import Title from 'app/components/shared/Title/Title'
import { MainProductsCard } from './MainProductsCard'

export const MainProducts = async () => {
  const products = await ServiceProducts.getMainProducts()

  return (
    <section id="main-products" className={styles.MainProducts} style={{ scrollMarginTop: '80px' }}>
      <Title variant="subtitle" className={styles.MainProducts__title}>
        New products released!
      </Title>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: any) => (
          <MainProductsCard
            id={product.id}
            key={product.id}
            title={product.title}
            image={product.image}
          />
        ))}
      </div>
    </section>
  )
}
