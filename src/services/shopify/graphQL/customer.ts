import { GraphQLClientSingleton } from 'app/graphql'
import { customerAllDataQuery } from 'app/graphql/queries/customerAlldata'
import { getOrdersQuery } from 'app/graphql/queries/getOrders'
import { decrypt } from 'app/utils/encryption'
import { cookies } from 'next/headers'

interface OrderNode {
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
}

interface CustomerOrdersResponse {
  customer: {
    orders: {
      edges: Array<{
        node: OrderNode
      }>
      totalCount: number
    }
  }
}

export const getCustomerOrders = async (): Promise<Order> => {
  const cookiesStorage = cookies()
  const accessToken = (await decrypt(cookiesStorage.get('accessToken')?.value)) || ''
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const variables = {
    customerAccessToken: accessToken,
  }

  const { customer } = await graphqlClient.request<CustomerOrdersResponse>(
    getOrdersQuery,
    variables
  )
  const orders = customer?.orders?.edges.map(({ node }) => node)
  return {
    totalCount: customer?.orders?.totalCount,
    orders,
  }
}

export const getAllCustomerData = async (): Promise<Customer> => {
  const cookiesStorage = cookies()
  const accessToken = (await decrypt(cookiesStorage.get('accessToken')?.value)) || ''
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const variables = {
    customerAccessToken: accessToken,
  }

  const { customer } = await graphqlClient.request<{ customer: Customer }>(
    customerAllDataQuery,
    variables
  )
  return customer
}
