import { ServiceProducts } from 'app/services/shopify/porducts'
import Image from 'next/image'
import styles from './MainProducts.module.scss'
import Title from 'app/components/shared/Title/Title'

export const MainProducts = async () => {
  const products = await ServiceProducts.getMainProducts()

  return (
    <section id="main-products" className={styles.MainProducts} style={{ scrollMarginTop: '80px' }}>
      <Title variant="subtitle" className={styles.MainProducts__title}>
        New products released!
      </Title>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: any) => {
          const imageSrc = product.image
          return (
            <article key={product.id}>
              <p>{product.title}</p>
              <Image src={imageSrc} fill alt={product.title} loading="eager" />
            </article>
          )
        })}
      </div>
    </section>
  )
}
