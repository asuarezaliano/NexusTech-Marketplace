import { ServiceCollections } from 'app/services/shopify/collections'
import Link from 'next/link'
import styles from './StoreLayout.module.scss'
import Title from 'app/components/shared/Title/Title'
import SortSelect from 'app/components/shared/SortSelect/SortSelect'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const collections = await ServiceCollections.getCollections()
  const sortedCollections = collections.sort((a, b) => a.title.localeCompare(b.title))

  return (
    <main className={styles.StoreLayout}>
      <div className={styles.StoreLayout__title}>
        <Title variant="subtitle">Store</Title>
        <SortSelect />
      </div>
      <div className={styles.StoreLayout__container}>
        <nav className={styles.StoreLayout__sidebar}>
          <ul className={styles.StoreLayout__list}>
            <Link key={'0'} href={'/store/'} className={styles.StoreLayout__chip}>
              Clear filter
            </Link>
            {sortedCollections.map((collection: any) => (
              <Link
                key={collection.id}
                href={'/store/' + collection.handle}
                className={styles.StoreLayout__chip}
              >
                {collection.title}
              </Link>
            ))}
          </ul>
        </nav>
        <div className={styles.StoreLayout__content}>{children}</div>
      </div>
    </main>
  )
}