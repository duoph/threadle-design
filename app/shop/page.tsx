import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <ProductContainerWithCategory />
      <ProductContainerWithCategory />
      <ProductContainerWithCategory />
      <ProductContainerWithCategory />
      <ProductContainerWithCategory />
    </div>
  )
}

export default page