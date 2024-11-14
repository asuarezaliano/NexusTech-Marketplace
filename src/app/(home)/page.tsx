import { MainProducts } from 'app/components/home/MainProducts'

export const metadata = {
  title: 'Nexus Tech',
  description: 'Welcome to future World',
  keywords: [
    'ecommerce',
    'store',
    'shopping',
    'online store',
    'e-commerce',
    'online shopping',
    'ecommerce store',
    'ecommerce shopping',
  ],
}

export default function Home() {
  return (
    <main>
      <MainProducts />
    </main>
  )
}
