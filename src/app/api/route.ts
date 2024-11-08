import { ServiceProducts } from 'app/services/shopify/porducts'

export async function GET() {
  const products = await ServiceProducts.getProducts()

  return Response.json({ products })
}
