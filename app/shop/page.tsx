import ProductCard from '@/components/ProductCard'
import React from 'react'

const Shop = () => {
  return (
    <div className='flex gap-3 flex-wrap items-center justify-center px-10 py-10'>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default Shop