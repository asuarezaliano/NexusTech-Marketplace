export type SortType = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc'

const sortOptions = {
  'price-asc': (a: ProductType, b: ProductType) => a.price - b.price,
  'price-desc': (a: ProductType, b: ProductType) => b.price - a.price,
  'title-asc': (a: ProductType, b: ProductType) => a.title.localeCompare(b.title),
  'title-desc': (a: ProductType, b: ProductType) => b.title.localeCompare(a.title),
}

export const sortBy = (array: ProductType[], sort: SortType) => {
  const sortFn = sortOptions[sort]
  return sortFn ? array.sort(sortFn) : array
}
