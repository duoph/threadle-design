"use client"

import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import { Category, Product } from '@/types'
import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'


const ProductPage = () => {


  const { productId } = useParams()
  const [product, setProduct] = useState<Product>()
  const [selectedSize, setSelectedSize] = useState<string>()
  const [quantity, setQuantity] = useState<number>(1)
  const [categories, setCategories] = useState<Category[] | []>([]);



  const size = ["S", "M", "L", "XL", "2XL", "3XL"]


  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${productId}`)

      setProduct(response.data.product[0])

    } catch (error) {
      console.log(error)
    }
  }


  const fetchCategory = async () => {
    try {
      const response = await axios.get("/api/category/" + product?.categoryId);
      console.log(response.data);
      setCategories(response.data.tdCategory);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchCategory()
    fetchProduct()
  }, [])


  const handleQuantity = (action: string) => {
    if (action === "increment") {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };



  return (
    <div className='w-full px-5 py-3 md:px-10 flex flex-col gap-3 mb-5'>
      <div className='flex flex-col w-full gap-3'>
        <div className='flex flex-row w-full gap-2 items-center justify-center bg-slate-200 '>
          <div>
            <Image src={product?.coverImageURL || "/greendress.png"} alt='greenDress' width={300} height={300} />
          </div>
          <div className='flex gap-2 flex-wrap'>
            <Image src={product?.moreImagesURLs[0] || "/greendress.png"} alt='greenDress' width={100} height={100} />
            <Image src={product?.moreImagesURLs[1] || "/greendress.png"} alt='greenDress' width={100} height={100} />
            <Image src={product?.moreImagesURLs[2] || "/greendress.png"} alt='greenDress' width={100} height={100} />
            <Image src={product?.moreImagesURLs[3] || "/greendress.png"} alt='greenDress' width={100} height={100} />         </div>
        </div>
        <div className='flex flex-col gap-5 items-start justify-start md:w-1/2'>
          <h1 className='text-lg font-medium'>{product?.title}</h1>
          <span className='text-start break-all flex items-center justify-start'>
            <FaStar size={24} className='text-yellow-300' />
            <FaStar size={24} className='text-yellow-300' />
            <FaStar size={24} className='text-yellow-300' />
            <FaStar size={24} className='text-yellow-300' />
            <CiStar size={24} className='text-yellow-300' />
            <span className='font-thin text-sm px-1'>4/5</span>
          </span>
          <p className='text-lg font-medium'>&#8377;{product?.regularPrice}</p>
          <div className='flex flex-col gap-5 w-full'>
            <p>Select Colors</p>
            <div className='flex gap-3'>
              <span className='h-[35px] bg-red-700 w-[35px] rounded-[50%] inline-block'></span>
              <span className='h-[35px] bg-green-700 w-[35px] rounded-[50%] inline-block'></span>
              <span className='h-[35px] bg-blue-700 w-[35px] rounded-[50%] inline-block'></span>
            </div>
            <div className='flex gap-3 font-light'>
              {size?.map((size) => (
                <button onClick={() => setSelectedSize(size)} className={`px-4 py-2  rounded-2xl ${selectedSize === size ? "bg-td-primary text-white" : "bg-gray-200"}`}>{size}</button>
              ))}
            </div>
            <div className='flex gap-3 font-semibold w-full'>
              <span className='bg-gray-200 flex items-center justify-between gap-4 px-8 py-2 rounded-2xl w-1/2'>
                <span className='cursor-pointer' onClick={() => handleQuantity("decrement")}>-</span>
                <span>{quantity}</span>
                <span className='cursor-pointer' onClick={() => handleQuantity("increment")}>+</span>
              </span>
              <button className='w-1/2 py-2 bg-td-primary rounded-2xl text-white'> Add to Cart </button>
            </div>
          </div>
        </div>
      </div>


      <div className='mt-5'>

        <p>{product?.desc}</p>

      </div>

      <div>
        {/* <ProductContainerWithCategory category={catego} /> */}
      </div>

    </div >
  )

}

export default ProductPage