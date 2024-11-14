'use server'
import { GraphQLClientSingleton } from 'app/graphql'
import { createCartMutation } from 'app/graphql/mutations/createCartMutation'
import { createUserMutation } from 'app/graphql/mutations/createUserMutation'
import { createAccessToken } from 'app/utils/auth/createAccessToken'
import { validateAccessToken } from 'app/utils/auth/validateAccessToken'
import { decrypt } from 'app/utils/encryption'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface CustomerCreateResponse {
  customerCreate: {
    customerUserErrors: any[]
    customer: CustomerBasicInfo
  }
}

export const handleCreateUser = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData)
  delete formDataObject['password_confirmation']
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const variables = {
    input: {
      ...formDataObject,
      phone: '+' + formDataObject.phone,
    },
  }

  const { customerCreate } = await graphqlClient.request<CustomerCreateResponse>(
    createUserMutation,
    variables
  )
  const { customerUserErrors, customer } = customerCreate

  if (customer?.firstName) {
    await createAccessToken(formDataObject.email as string, formDataObject.password as string)
    redirect('/login')
  }
}

export const handleLogin = async (formData: LoginData) => {
  const accesToken = await createAccessToken(formData.email, formData.password)
  if (accesToken) {
    redirect('/store')
  }
}

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies()
  const accesToken = (await decrypt(cookiesStore.get('accessToken')?.value)) as string

  if (!accesToken) redirect('/login')

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const customer = await validateAccessToken()
  const variables = {
    input: {
      buyerIdentity: {
        customerAccessToken: accesToken,
        email: customer?.email,
      },
      lines: items.map(item => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  }

  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string
      }
    }
  } = await graphqlClient.request(createCartMutation, variables)

  return cartCreate?.cart?.checkoutUrl
}

export async function logout() {
  cookies().delete('accessToken')
}
