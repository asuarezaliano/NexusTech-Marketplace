import { GraphQLClientSingleton } from 'app/graphql'
import { customerName } from 'app/graphql/queries/customerName'
import { cookies } from 'next/headers'

export const validateAccessToken = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return null
  }

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()

  try {
    const { customer }: any = await graphqlClient.request(customerName, {
      customerAccessToken: accessToken,
    })
    return customer
  } catch (error) {
    console.error('Error validating access token:', error)
    return null
  }
}
