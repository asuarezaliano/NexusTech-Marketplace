import Title from 'app/components/shared/Title/Title'
import styles from './OrdersInfo.module.scss'

export default async function MyAccountPage() {
  return (
    <div>
      <Title variant="subtitle" className={styles.title}>
        My Account
      </Title>
    </div>
  )
}
