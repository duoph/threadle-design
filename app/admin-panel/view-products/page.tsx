import ProductCard from '@/components/ProductCard'
import React from 'react'

const ViewAllProducts = () => {



    return (
        <div className='md:px-10 px-5 py-10 flex flex-wrap items-center justify-center gap-3'>
            {/* <h1>All Products</h1> */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    )
}

export default ViewAllProducts