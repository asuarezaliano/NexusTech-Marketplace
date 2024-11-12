import { ProductsWrapper } from 'app/components/Store/ProductWrapper'
import { ServiceProducts } from 'app/services/shopify/porducts'
import { ServiceCollections } from 'app/services/shopify/collections'
import { sortBy, SortType } from 'app/utils/sorts'

interface CategoryProps {
  params: {
    categories: string[] //  /store/men/tshirt
  }
  searchParams?: {
    sort?: string
  } //  /store/men/tshirt?color=blue
}

export default async function Category(props: CategoryProps) {
  const { categories } = props.params
  const { sort } = props.searchParams ?? {}

  let products = []
  const collections = await ServiceCollections.getCollections()

  if (categories?.length > 0) {
    const selectedCollectionId = collections.find(
      (collection: any) => collection.handle === categories[0]
    ).id
    products = await ServiceProducts.getProducts(undefined, selectedCollectionId)
  } else {
    products = await ServiceProducts.getProducts()
  }

  if (sort) {
    products = sortBy(products, sort as SortType)
  }

  return <ProductsWrapper products={products} />
}
