import { ProductsWrapper } from 'app/components/Store/ProductWrapper'
import { ServiceProducts } from 'app/services/shopify/porducts'
import { ServiceCollections } from 'app/services/shopify/collections'

interface CategoryProps {
  params: {
    categories: string[] //  /store/men/tshirt
  }
  searchParams?: string //  /store/men/tshirt?color=blue
}

export default async function Category(props: CategoryProps) {
  const { categories } = props.params
  let products = []
  const collections = await ServiceCollections.getCollections()

  if (categories?.length > 0) {
    const selectedCollectionId = collections.find(
      (collection: any) => collection.handle === categories[0]
    ).id
    products = await ServiceCollections.getCollectionProducts(selectedCollectionId)
  } else {
    products = await ServiceProducts.getProducts()
  }

  return <ProductsWrapper products={products} />
}
