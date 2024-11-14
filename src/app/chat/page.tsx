import { createAgent } from 'app/utils/agent/createAgent'
import { ServiceProducts } from 'app/services/shopify/porducts'
import { Chat } from 'app/components/chat/Chat'

export default async function ChatPage() {
  const products = await ServiceProducts.getProducts()
  const productsTitles = products.map(p => p.title).join('\n')
  const agent = createAgent(productsTitles)

  return (
    <>
      <Chat agent={agent} />
    </>
  )
}
