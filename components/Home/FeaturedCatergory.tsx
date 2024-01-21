import React from 'react'
import ProductContainerWithCategory from '../ProductContainerWithCategory'

const FeaturedCatergory = () => {
    return (
        <div className='flex flex-col gap-3 items-center justify-center mt-10 mb-10 '>
            <ProductContainerWithCategory />
            <ProductContainerWithCategory />
        </div>
    )
}

export default FeaturedCatergory