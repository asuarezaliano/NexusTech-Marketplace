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

interface Order {
  cancelReason: string | null
  canceledAt: string | null
  currencyCode: string
  customerLocale: string
  customerUrl: string
  edited: boolean
  email: string
  financialStatus: string
  fulfillmentStatus: string
  id: string
  name: string
  orderNumber: number
  phone: string
  processedAt: string
  statusUrl: string
  lineItems: any
}

interface Customer {
  firstName
  email
}
