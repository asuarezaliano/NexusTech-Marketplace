import styles from './PaymentStatusLabel.module.scss'

export type PaymentStatus =
  | 'AUTHORIZED'
  | 'EXPIRED'
  | 'PAID'
  | 'PARTIALLY_PAID'
  | 'PARTIALLY_REFUNDED'
  | 'PENDING'
  | 'REFUNDED'
  | 'VOIDED'

interface PaymentStatusLabelProps {
  status: PaymentStatus
}

const statusDisplayMap: Record<PaymentStatus, string> = {
  AUTHORIZED: 'Authorized',
  EXPIRED: 'Expired',
  PAID: 'Paid',
  PARTIALLY_PAID: 'Partially paid',
  PARTIALLY_REFUNDED: 'Partially refunded',
  PENDING: 'Pending',
  REFUNDED: 'Refunded',
  VOIDED: 'Voided',
}

export default function PaymentStatusLabel({ status }: PaymentStatusLabelProps) {
  return (
    <div className={`${styles.statusLabel} ${styles[status.toLowerCase()]}`}>
      {statusDisplayMap[status]}
    </div>
  )
}
