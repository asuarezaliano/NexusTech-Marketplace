import axios from 'axios'
import { shopifyUrls } from './urls'
import { env } from 'app/config/env'

export const ServiceProducts = {
  getProducts: async (id?: string, collectionId?: string): Promise<ProductType[]> => {
    try {
      let apiUrl = shopifyUrls.products.all
      if (id) {
        apiUrl += `?ids=${id}`
      }
      if (collectionId) {
        apiUrl += `${id ? '&' : '?'}collection_id=${collectionId}`
      }

      const { data } = await axios.get(apiUrl, {
        headers: {
          'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
        },
      })
      const products = data.products

      const transformedProducts = products.map((product: any) => {
        return {
          id: product.id,
          gql_id: product.variants[0].admin_graphql_api_id,
          title: product.title,
          description: product.body_html,
          price: product.variants[0].price,
          image: product.images[0].src,
          quantity: product.variants[0].inventory_quantity,
          handle: product.handle,
          tags: product.tags,
          vendor: product.vendor,
        }
      })
      return transformedProducts
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },
  getMainProducts: async () => {
    const response = await fetch(shopifyUrls.products.mainProducts, {
      headers: new Headers({
        'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
      }),
      next: {
        revalidate: 60 * 60, // 1 h
      },
    })

    const { products } = await response.json()

    return products
  },
}
