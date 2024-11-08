import { ProductView } from 'app/components/Product/ProductView'
import { ServiceProducts } from 'app/services/shopify/porducts'
import { redirect } from 'next/navigation'

interface ProductPageProps {
  searchParams: {
    id: string
  }
}

export async function generateMetadata({ searchParams }: ProductPageProps) {
  const id = searchParams.id

  if (!id) return null

  const products = await ServiceProducts.getProducts(id)
  const product = products[0]

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image],
    },
  }
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const id = searchParams.id

  if (!id) redirect('/store')

  const products = await ServiceProducts.getProducts(id)
  const product = products[0]

  return <ProductView product={product} />
}
