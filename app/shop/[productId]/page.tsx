"use client"
import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import { PulseLoader } from 'react-spinners'
import { useParams } from 'next/navigation'
import { Product } from '@/types'

const ProductPage = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState<Product>()
  const [selectedSize, setSelectedSize] = useState<string>()
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedColor, setSelectedColor] = useState<string>("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`)
        setProduct(response.data.product[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [productId])




  const handleQuantity = (action: string) => {
    if (action === "increment" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const sizes: any = ["S", "M", "L", "XL", "2XL", "3XL"]


  return (
    <div className='w-full px-5 py-3 md:px-10 flex flex-col gap-3 mb-5 '>
      {!product ? (
        <div className="w-full h-[70vh] flex items-center justify-center px-5 py-3 md:px-10 gap-3 mb-5 ">
          <PulseLoader />
        </div>
      ) : (
        <div className='flex flex-col w-full gap-3'>
          <div className='flex flex-row w-full gap-2 items-center justify-center bg-slate-200 '>
            <div>
              <Image src={product?.coverImageURL || "/greendress.png"} alt='greenDress' width={300} height={300} />
            </div>
          </div>
          <div className='flex flex-col gap-5 items-start justify-start w-full '>
            <h1 className='text-lg font-medium'>{product?.title}</h1>
            <div className='flex gap-3'>
              <p className={`text-lg font-medium ${product?.salePrice && "line-through"}`}>&#8377;{product?.regularPrice}</p>
              {product?.salePrice && <p className={`text-lg text-red-600 font-medium`}>&#8377;{product?.salePrice}</p>}
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <p>Select Colors</p>
              <div className='flex gap-3'>
                {/* Color hardcode */}
                <span onClick={() => setSelectedColor("red")} className={`relative cursor-pointer h-[35px] bg-red-700 w-[35px] rounded-[50%] flex items-center justify-center shadow-lg ${selectedColor === "red" && "bg-opacity-80"}`}>
                  {selectedColor === "red" && <IoIosCheckmark className='text-white z-10 bg-opacity-35' size={24} />}
                </span>
                <span onClick={() => setSelectedColor("blue")} className={`relative cursor-pointer h-[35px] bg-blue-700 w-[35px] rounded-[50%] flex items-center justify-center shadow-lg ${selectedColor === "blue" && "bg-opacity-80"}`}>
                  {selectedColor === "blue" && <IoIosCheckmark className='text-white z-10 bg-opacity-35' size={24} />}
                </span>
                <span onClick={() => setSelectedColor("green")} className={`relative cursor-pointer h-[35px] bg-green-700 w-[35px] rounded-[50%] flex items-center justify-center shadow-lg ${selectedColor === "green" && "bg-opacity-80"}`}>
                  {selectedColor === "green" && <IoIosCheckmark className='text-white z-10 bg-opacity-35' size={24} />}
                </span>
              </div>

              <div className='flex flex-wrap gap-3 font-light'>
                {sizes?.map(({ s, i }: any) => (
                  <button key={i} onClick={() => setSelectedSize(s)} className={`px-4 py-2 rounded-2xl ${selectedSize === s ? "bg-td-primary text-white" : "bg-gray-200"}`}>{s}
                    M</button>
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
      )}
      <div className='mt-5'>
        <p>{product?.desc}</p>
      </div>
      {product?.category && (
        <div className='py-3'>
          <ProductContainerWithCategory productNotToshow={product._id} title='You Might Like' categoryId={product?.category} />
        </div>
      )}
    </div>
  )
}

export default ProductPage
