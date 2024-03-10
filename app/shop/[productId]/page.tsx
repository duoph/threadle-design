"use client"
import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import { PulseLoader } from 'react-spinners'
import { useParams } from 'next/navigation'
import { Product } from '@/types'
import { FaHeart } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { CiHeart } from 'react-icons/ci'
import { FaWhatsappSquare } from 'react-icons/fa'
import Head from 'next/head'


const ProductPage = () => {




  const { productId } = useParams()
  const [product, setProduct] = useState<Product>()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedColor, setSelectedColor] = useState<string>()
  const [wishlistIds, setWishListIds] = useState<string[]>([])



  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"]


  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${productId}`)
      setProduct(response.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
    userWishlist()
  }, [])


  const userWishlist = async () => {
    try {
      const res = await axios.get('/api/wishlist')
      console.log(res)
      setWishListIds(res?.data?.wishListIds)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDislike = async () => {
    try {
      const res = await axios.put(`/api/wishlist/${productId}`)
      if (res.data.success === true) {
        toast.success("Removed from wishlist")
      }
      if (res.data.success === false) {
        toast.error("error")
      }
      userWishlist()

    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/wishlist/${productId}`)
      if (res.data.success === true) {
        toast.success("Added to wishlist")
      }
      if (res.data.success === false) {
        toast.error("error")
      }
      userWishlist()

    } catch (error) {
      console.log(error)
    }
  }


  const handleQuantity = (action: string) => {
    if (action === "increment" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleWhatsapp = async () => {
    try {

    } catch (error) {

    }
  }




  return (
    <div className='w-full px-5 py-3 md:px-10 flex flex-col gap-3 mb-5 '>
      <Head>
        {/* Meta tags for social sharing */}
        <meta property="og:title" content={product?.title} />
        <meta property="og:description" content={product?.desc} />
        <meta property="og:image" content={product?.coverImageURL || "/greendress.png"} />
        <meta property="og:url" content={`https://www.threadledesigns.com/`} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* You may add more meta tags for social sharing as needed */}
      </Head>
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
            <div className="flex items-center w-full justify-between">
              <h1 className='text-lg font-medium'>{product?.title}</h1>
              <div>
                {wishlistIds?.includes(`${productId}`) ? (
                  <button onClick={handleDislike} className='flex  w-[43px] border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                    <FaHeart className='text-center   text-td-secondary hover:scale-110' size={24} />
                  </button>
                ) : (<button onClick={handleLike} className='flex  w-[43px] border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                  <CiHeart className='text-center   text-td-secondary hover:scale-110' size={24} />
                </button>)}
              </div>
            </div>
            <div className='flex gap-3'>

              {product?.isCustom && (<div>
                <button onClick={handleWhatsapp} className='bg-black px-4 py-4 rounded-full flex gap-2'>
                  <FaWhatsappSquare className='text-green-500' size={24} />
                  <p className='text-white'>Contact us for pricing</p>
                </button>
              </div>)}
              {!product?.isCustom && (<div className="flex gap-3">
                <p className={`text-lg font-medium ${product?.salePrice && "line-through"}`}>&#8377;{product?.regularPrice}</p>
                {product?.salePrice && <p className={`text-lg text-red-600 font-medium`}>&#8377;{product?.salePrice}</p>}
              </div>)}

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
                {sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-2xl ${selectedSize === size ? "bg-td-primary text-white" : "bg-gray-200"}`}>{size}</button>
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
