import styles from './OrderStatusLabel.module.scss'

type OrderStatus =
  | 'FULFILLED'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'OPEN'
  | 'PARTIALLY_FULFILLED'
  | 'PENDING_FULFILLMENT'
  | 'REQUEST_DECLINED'
  | 'RESTOCKED'
  | 'SCHEDULED'
  | 'UNFULFILLED'

interface OrderStatusLabelProps {
  status: OrderStatus
}

const statusDisplayMap: Record<OrderStatus, string> = {
  FULFILLED: 'Fulfilled',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  OPEN: 'Open',
  PARTIALLY_FULFILLED: 'Partially Fulfilled',
  PENDING_FULFILLMENT: 'Pending Fulfillment',
  REQUEST_DECLINED: 'Request Declined',
  RESTOCKED: 'Restocked',
  SCHEDULED: 'Scheduled',
  UNFULFILLED: 'Unfulfilled',
}

export default function OrderStatusLabel({ status }: OrderStatusLabelProps) {
  return (
    <span className={`${styles.label} ${styles[status.toLowerCase()]}`}>
      {statusDisplayMap[status]}
    </span>
  )
}
