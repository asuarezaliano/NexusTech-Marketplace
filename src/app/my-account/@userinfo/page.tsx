import { getAllCustomerData } from 'app/services/shopify/graphQL/customer'
import styles from './page.module.scss'

export default async function MyAccountPage() {
  const customer = await getAllCustomerData()

  return (
    <div className={styles.container}>
      <section className={styles.userCard}>
        <h2 className={styles.title}>Personal Information</h2>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Name:</span>
            <span className={styles.value}>
              {customer.firstName} {customer.lastName}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{customer.email}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>{customer.phone}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Orders placed:</span>
            <span className={styles.value}>{customer.orders.totalCount}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Customer since:</span>
            <span className={styles.value}>
              {new Date(customer.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className={styles.addressSection}>
          <h3>Main Address</h3>
          <p>
            {customer.defaultAddress.address1}: {customer.defaultAddress.formatted.join(', ')}
          </p>
        </div>
      </section>
    </div>
  )
}
