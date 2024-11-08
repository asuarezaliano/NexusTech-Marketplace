import { GraphQLClientSingleton } from 'app/graphql'
import { getOrdersQuery } from 'app/graphql/queries/getOrders'
import { cookies } from 'next/headers'

interface OrderNode {
  id: string
  orderNumber: number
  processedAt: string
  financialStatus: string
  fulfillmentStatus: string
  totalPrice: {
    amount: string
    currencyCode: string
  }
  // Añade más campos según necesites
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

export const getCustomerOrders = async () => {
  const cookiesStorage = cookies()
  const accessToken = cookiesStorage.get('accessToken')?.value || ''
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
    totalOrders: customer?.orders?.totalCount,
    orders,
  }
}
