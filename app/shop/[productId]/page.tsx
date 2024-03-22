"use client"

import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import { PulseLoader } from 'react-spinners'
import { useParams, useRouter } from 'next/navigation'
import { Product } from '@/types'
import { FaCheck, FaHeart } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { CiHeart } from 'react-icons/ci'
import { FaWhatsappSquare } from 'react-icons/fa'
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@/context/useUser'




const ProductPage = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState<Product>()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedColor, setSelectedColor] = useState<string>()
  const [wishlistIds, setWishListIds] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string>()


  const { cartItemsFetch } = useUser()


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
      setWishListIds(res?.data?.user?.wishList?.map((item: any) => item._id))
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
        toast.error(res.data?.message)
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

  const addToCart = async () => {
    try {
      const res = await axios.post("/api/cart", {
        productId, color: selectedColor, size: selectedSize, quantity, price: product?.salePrice || product?.regularPrice, imageURL: product?.coverImageURL, title: product?.title
      })
      if (res.data.success === true) {
        toast.success("Added to cart")
        cartItemsFetch()
      }
      if (res.data.success === false) {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviewImageLink = (link?: string) => {
    try {
      if (link) {
        setPreviewImage(link)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleSize = (size: string) => {
    try {
      if (product?.isCustom === false) {
        console.log(product?.isCustom)
        setSelectedSize(size) // Change this line to setSelectedSize
      } else {
        setSelectedSize("") // Change this line to setSelectedSize
      }
    } catch (error) {
      console.log(error)
    }
  }


  const wpLink = `https://api.whatsapp.com/send?phone=919074063723&text=Hello%20I%20want%20to%20know%20more%20about%20this%20product...%20https://www.threadledesigns.com/shop/${productId}`


  return (
    <div className='w-full px-5 py-3 md:px-10 flex flex-col gap-3 mb-5 '>
      <Head>
        <title property='og:title'>My page title</title>
        <meta property="og:description" content={product?.desc} />
        <meta property="og:image" content={product?.coverImageURL || "/greendress.png"} />
        <meta property="og:url" content={`https://www.threadledesigns.com/`} />
      </Head>
      {!product ? (
        <div className="w-full h-[70vh] flex items-center justify-center px-5 py-3 md:px-10 gap-3 mb-5 ">
          <PulseLoader />
        </div>
      ) : (
        <div className='flex flex-col w-full gap-3'>
          <div className='flex flex-col w-full gap-1 items-center justify-center bg-slate-100 '>
            <div>

              <Image style={{ objectFit: "contain" }} src={previewImage || product?.coverImageURL || product?.moreImagesURLs[0] || product?.moreImagesURLs[1] || product?.moreImagesURLs[2] || product?.moreImagesURLs[3] || "/noImage.jpg"} alt='greenDress' className='h-[350px]' width={300} height={200} />
            </div>



            {product?.moreImagesURLs?.length !== 0 && <div className='h-[5rem] bg-gray-300 w-full flex items-center justify-center gap-1'>
              {product?.moreImagesURLs?.map((imageUrl, index) => (
                imageUrl && (
                  <div key={index} className='relative'>
                    {imageUrl === previewImage && (
                      <div onClick={() => handlePreviewImageLink(product?.coverImageURL)} className='absolute cursor-pointer flex items-center justify-center bg-gray-500 bg-opacity-50 w-full h-full'>
                        <FaCheck className='text-white' />
                      </div>
                    )}
                    <Image
                      onClick={() => handlePreviewImageLink(imageUrl)}
                      src={imageUrl}
                      className='h-[4.7rem] cursor-pointer'
                      style={{ objectFit: 'cover' }}
                      alt={`Image ${index}`}
                      width={65}
                      height={65}
                      quality={50}
                    />
                  </div>
                )
              ))}
            </div>}


          </div>
          <div className='flex flex-col gap-3 items-start justify-start w-full '>
            <div className="flex items-center  w-full justify-between">
              <div className='flex flex-col gap-3'>
                <h1 className='text-lg font-medium'>{product?.title}</h1>

                {!product.inStock && (
                  <span className='text-lg font-medium text-red-600'>Out of stock</span>
                )}
              </div>


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
                <Link target='_blank' href={wpLink} className='bg-black px-3 py-2 rounded-full flex gap-2'>
                  <FaWhatsappSquare className='text-green-500' size={24} />
                  <p className='text-white'>Contact us for pricing</p>
                </Link>
              </div>)}
              {!product?.isCustom && (<div className="flex gap-3">
                <p className={`text-lg font-medium ${product?.salePrice && "line-through"}`}>&#8377;{product?.regularPrice}</p>
                {product?.salePrice && <p className={`text-lg text-red-600 font-medium`}>&#8377;{product?.salePrice}</p>}
              </div>)}

            </div>
            <div className='flex flex-col gap-4 w-full'>
              <p>{!product?.isCustom ? "Select Color" : "Available Colors"}</p>
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

              <div className='flex flex-col flex-wrap gap-3'>
                <p>{!product?.isCustom ? "Select Size" : "Available Size's"}</p>
                <div className='flex gap-2 flex-wrap font-light'>
                  {sizes.map((size, i) => (
                    <button key={i} onClick={() => handleSize(size)} className={`px-4 py-2 rounded-2xl ${selectedSize === size ? "bg-td-primary text-white" : "bg-gray-200"}`}>{size}</button>
                  ))}
                </div>
              </div>


              {!product?.isCustom && product?.inStock ? (
                <div className='flex gap-3 font-semibold w-full'>
                  <span className='bg-gray-200 flex items-center justify-between gap-4 px-8 py-2 rounded-2xl w-1/2'>
                    <span className='cursor-pointer' onClick={() => handleQuantity("decrement")}>-</span>
                    <span>{quantity}</span>
                    <span className='cursor-pointer' onClick={() => handleQuantity("increment")}>+</span>
                  </span>
                  <button onClick={addToCart} className='w-1/2 py-2 bg-td-primary rounded-2xl text-white'> Add to Cart </button>
                </div>
              ) : (
                null
              )}

            </div>
          </div>
        </div>
      )
      }
      <div className='mt-5'>
        <p>{product?.desc}</p>
      </div>
      {
        product?.category && (
          <div className='py-3'>
            <ProductContainerWithCategory productNotToshow={product._id} title='You may also like' categoryId={product?.category} />
          </div>
        )
      }
    </div >
  )
}

export default ProductPage
