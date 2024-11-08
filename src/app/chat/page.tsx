import { createAgent } from 'app/utils/agent/createAgent'
import Chat from '../../components/chat/Chat'
import { ServiceProducts } from 'app/services/shopify/porducts'

export default async function ChatPage() {
  const products = await ServiceProducts.getProducts()
  const productsTitles = products.map(p => p.title).join('\n')
  const agent = createAgent(productsTitles)

  return (
    <>
      <h1>Chatbot</h1>
      <Chat agent={agent} />
    </>
  )
}
