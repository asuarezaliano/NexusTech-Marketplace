interface ErrorPageProps {
  error: Error
  reset: () => void
}

interface ProductType {
  id: string
  title: string
  description: string
  price: number
  image: string
  quantity: number
  handle: string
  tags: string
  gql_id: string
  vendor: string
}

interface CartItem {
  title: string
  price: number
  quantity: number
  id: string
  image: string
  description: string
  merchandiseId: string
}

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  orders: {
    totalCount: string
  }
  createdAt: string
  defaultAddress: {
    formatted: any[]
    address1: string
  }
  addresses: {
    edges: any[]
  }
}

interface CustomerBasicInfo extends Pick<Customer, 'firstName' | 'email'> {}

interface Order {
  totalCount: number
  orders: Array<{
    cancelReason: string | null
    canceledAt: string | null
    currencyCode: string
    customerLocale: string
    customerUrl: string
    edited: boolean
    email: string
    financialStatus: PaymentStatus
    fulfillmentStatus: OrderStatus
    id: string
    name: string
    orderNumber: number
    phone: string
    processedAt: string
    statusUrl: string
    lineItems: {
      edges: Array<{
        cursor: string
        node: {
          currentQuantity: number
          quantity: number
          title: string
        }
      }>
    }
  }>
}
