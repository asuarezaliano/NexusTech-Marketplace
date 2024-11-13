import styles from './OrdersInfo.module.scss'
import { getCustomerOrders } from 'app/services/shopify/graphQL/customer'
import Title from 'app/components/shared/Title/Title'
import PaymentStatusLabel from 'app/components/shared/PaymentStatusLabel/PaymentStatusLabel'
import OrderStatusLabel from 'app/components/shared/OrderStatusLabel/OrderStatusLabel'
import { Button } from 'app/components/shared/Button/Button'
import Link from 'next/link'

export default async function OrdersInfoPage() {
  const ordersInfo = await getCustomerOrders()
  return (
    <div className={styles.ordersContainer}>
      <Title variant="subtitle" className={styles.title}>
        My Orders
      </Title>
      <div className={styles.ordersList}>
        {ordersInfo.orders?.map(order => (
          <div key={order.orderNumber} className={styles.orderCard}>
            <span className={styles.orderNumber}>Order #{order.orderNumber}</span>
            <div className={styles.orderHeader}>
              <div className={styles.orderStatusRow}>
                <div className={styles.statusRow}>
                  <label>Shipping status: </label>
                  <OrderStatusLabel status={order.fulfillmentStatus}></OrderStatusLabel>
                </div>
                <div className={styles.statusRow}>
                  <label>Financial status: </label>
                  <PaymentStatusLabel status={order.financialStatus} />
                </div>
              </div>

              <div className={styles.orderMeta}>
                <div className={styles.statusRow}>
                  <label>Order date: </label>
                  <span className={styles.orderDate}>
                    {new Date(order.processedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.statusRow}>
                  <label>Email: </label>
                  <span className={styles.orderEmail}>{order.email}</span>
                </div>
                {order.phone && (
                  <div className={styles.statusRow}>
                    <label>Phone: </label>
                    <span className={styles.orderPhone}>{order.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.orderDetails}>
              {order.canceledAt && (
                <div className={styles.cancelInfo}>
                  <div className={styles.cancelReason}>Canceled: {order.cancelReason}</div>
                  <div className={styles.cancelDate}>
                    on {new Date(order.canceledAt).toLocaleDateString()}
                  </div>
                </div>
              )}
              <div className={styles.orderInfo}>
                <h4>Order Items:</h4>
                {order.lineItems.edges.map(({ node }) => (
                  <div key={node.title} className={styles.infoItem}>
                    <span>{node.title}</span>
                    <div>
                      Quantity: {node.quantity}
                      {node.currentQuantity !== node.quantity &&
                        ` (${node.currentQuantity} currently available)`}
                    </div>
                  </div>
                ))}
              </div>
              <Link href={order.statusUrl}>
                <Button className={styles.statusLink}>View Order Status</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
