import { ServiceProducts } from 'app/services/shopify/porducts'
import Image from 'next/image'
import styles from './MainProducts.module.scss'

export const MainProducts = async () => {
  const products = await ServiceProducts.getMainProducts()

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
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
