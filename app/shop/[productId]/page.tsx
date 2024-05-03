"use client"

import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import { PulseLoader } from 'react-spinners'
import { useParams, useRouter } from 'next/navigation'
import { Product, User } from '@/types'
import { FaCheck, FaHeart } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { CiHeart } from 'react-icons/ci'
import { FaWhatsappSquare } from 'react-icons/fa'
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@/context/useUser'
import Script from 'next/script'


const ProductPage = () => {

  const router = useRouter()

  const { productId } = useParams()
  const [product, setProduct] = useState<Product>()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedColor, setSelectedColor] = useState<string>()
  const [wishlistIds, setWishListIds] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>();


  const { cartItemCountFetch, currentUser } = useUser()


  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"]


  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${productId}`)
      console.log(response.data.product)
      setProduct(response.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/api/user/${currentUser?.userId}`)
      setUser(res?.data?.user);
      console.log(res)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }


  useEffect(() => {
    fetchProduct()
    userWishlist()
    fetchUser()
  }, [])



  const userWishlist = async () => {
    const userId = currentUser?.userId
    try {
      const res = await axios.get(`/api/wishlistFetch/${userId}`)
      console.log(res)
      setWishListIds(res?.data?.wishList)
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
  }

  const addToCart = async () => {
    try {

      if (!selectedColor || !selectedSize) {
        setIsLoading(false);
        return toast.error("Select Size and Color");
      }

      const res = await axios.post("/api/cart", {
        productId, color: selectedColor, size: selectedSize, quantity, price: product?.salePrice || product?.regularPrice, imageURL: product?.coverImageURL, title: product?.title
      })
      if (res.data.success === true) {
        toast.success("Added to cart")
        cartItemCountFetch()
      }
      // if (res.data.success === false) {
      //   toast.error(res?.data?.message)
      // }
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
      if (!product?.isCustom) {
        setSelectedSize(size)
      } else {
        setSelectedSize("")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleColor = (color: string) => {
    try {
      if (!product?.isCustom) {
        setSelectedColor(color);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const productPaid = async (response: any) => {
    try {
      const res = await axios.post("/api/product/buy-now", {
        productId,
        color: selectedColor,
        size: selectedSize,
        quantity,
        phoneNumber: user?.phone,
        whatsAppNumber: user?.whatsAppNumber,
        toAdress: user?.address,
        price: product?.salePrice || product?.regularPrice,
        imageURL: product?.coverImageURL,
        title: product?.title,
        customerName: user?.name,
        toAddress: user?.address,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      await axios.post("/api/sms", {
        phone: `+91${user?.phone}`,
        message: `Threadle Designs : Your order for ${product?.title} is successfully Placed will notify you when it is shipped`
      }
      )

      if (res.data.success === true) {
        cartItemCountFetch();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to cart");
    }
  }



  const handlePayment = async () => {
    try {

      setIsLoading(true)

      if (!selectedColor || !selectedSize || !user?.address || user?.address.length <= 10 || user?.address === "") {
        if (!user?.address || user?.address === "" || user?.address.length <= 10) {
          toast.error("Add Address");
          return router.push(`/account/${currentUser?.userId}`);
        } else {
          setIsLoading(false);
          return toast.error("Select Size and Color");
        }
      }


      const res = await axios.post("/api/razorpay", {
        totalAmount: product?.salePrice || product?.regularPrice,
        notes: "Hello this is a test order"
      })


      console.log(res)


      const order = res.data.order
      const options = {
        order_id: order?.id,
        name: 'Threadles Design',
        image: "/td.png",
        theme: "green",
        test: "fesmfserf",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            // Payment successful
            toast.success("Payment successful!");
            productPaid(response);
            router.push(`/account/${currentUser?.userId}/orders`)
          } else {
            // Payment failed
            toast.error("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "jdoe@example.com",
          contact: "9876543210", productName: "This a kurta for sale", MyName: "hadi Rasal"
        },
      };
      setIsLoading(false)
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  };

  // document.title = product?.title || "Shop Now"


  const wpLink = `https://api.whatsapp.com/send?phone=919074063723&text=https%3A%2F%2Fthreadle-design.vercel.app%2Fshop%2F${product ? product._id : ''}%0AProductId%20%3A%20${product ? product._id : ''}%0ATitle%20%3A%20${product ? product.title : ''}${product && product.desc ? `%0ADesc%3A%20${product.desc}` : ''}`;



  return (
    <div className='w-full px-5 py-3 md:px-10 flex flex-col gap-3 mb-5 '>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {product && (
        <Head>
          <title>{product.title || "Shop Now"}</title>
          <meta property='og:title' content={product.title || "Shop Now"} />
          <meta property="og:description" content={product.desc} />
          <meta property="og:image" content={product.coverImageURL || "/greendress.png"} />
          <meta property="og:url" content={`https://www.threadledesigns.com/shop/${productId}`} />
        </Head>
      )}
      {
        !product ? (
          <div className="w-full h-[70vh] flex items-center justify-center px-5 py-3 md:px-10 gap-3 mb-5 ">
            <PulseLoader />
          </div>
        ) : (
          <div className='flex flex-col w-full gap-3'>
            <div className='flex flex-col w-full gap-1 items-center justify-center bg-slate-100 '>
              <div className='relative w-[300px] h-[300px] '>
                <Image priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "contain" }} src={previewImage || product?.coverImageURL || product?.moreImagesURLs[0] || product?.moreImagesURLs[1] || product?.moreImagesURLs[2] || product?.moreImagesURLs[3] || "/noImage.jpg"} alt='greenDress' className='h-[350px]' fill={true} />
              </div>

              {product?.moreImagesURLs?.length !== 0 && <div className='h-[5rem] bg-gray-300 w-full flex items-center justify-center gap-1'>
                {product?.moreImagesURLs?.map((imageUrl, index) => (
                  imageUrl && (
                    <div key={index} className='relative h-[70px] w-[55px]'>
                      {imageUrl === previewImage && (
                        <div onClick={() => handlePreviewImageLink(product?.coverImageURL)} className='absolute z-10 cursor-pointer flex items-center justify-center bg-gray-500 bg-opacity-50 w-full h-full'>
                          <FaCheck className='text-white' />
                        </div>
                      )}
                      <Image
                        onClick={() => handlePreviewImageLink(imageUrl)}
                        src={imageUrl}
                        className='h-[4.7rem] cursor-pointer'
                        style={{ objectFit: 'cover' }}
                        alt={`Image`}
                        fill={true}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )
                ))}
              </div>}


            </div>
            <div className='flex flex-col gap-2 items-start justify-start w-full '>
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
              <div className='flex flex-col gap-1'>
                <span className='text-sm flex items-center justify-center gap-1'>All over india free delivery
                  <div className='relative h-[14px] w-[14px] flex items-center justify-center'>
                    <Image priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={"/india.png"} fill={true} alt="Indian flag" />
                  </div>
                </span>
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

                {product?.colors?.length > 0 && (
                  <p>{!product?.isCustom ? "Select Color" : "Available Colors"}</p>
                )}


                <div className='flex gap-3 bg-slate-100 px-3 py-4'>
                  {/* Colors display */}
                  {product?.colors?.map((color, i) => (
                    <span
                      key={i}
                      onClick={() => { handleColor(color) }}
                      style={{ background: color }}
                      className={`relative cursor-pointer h-[35px] w-[35px] rounded-[50%] flex items-center justify-center shadow-lg`}
                    >
                      {selectedColor === color && <IoIosCheckmark className='text-black absolute -bottom-5 z-10' size={24} />}
                    </span>
                  ))}
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
                  <div className='flex flex-col gap-3 font-semibold w-full'>
                    <span className='bg-gray-200 flex items-center justify-between gap-4 px-8 py-2 rounded-2xl w-1/2'>
                      <span className='cursor-pointer' onClick={() => handleQuantity("decrement")}>-</span>
                      <span>{quantity}</span>
                      <span className='cursor-pointer' onClick={() => handleQuantity("increment")}>+</span>
                    </span>
                    <div className='flex gap-3'>
                      <button onClick={addToCart} className='w-1/2 py-2 bg-td-secondary rounded-2xl text-white'> Add to Cart </button>
                      <button onClick={handlePayment} className='w-1/2 py-2 bg-td-secondary rounded-2xl text-white flex items-center justify-center'>

                        {isLoading ? <PulseLoader color='white' /> : "Buy Now"}
                      </button>
                    </div>

                  </div>
                ) : (
                  null
                )}

              </div>
              <div className='mt-5 w-full'>
                <p className='break-all w-full'>{product?.desc}</p>
              </div>
              <div className='py-3 w-full'>
                {product._id && product.category && (
                  <ProductContainerWithCategory setIsLoading={setIsLoading} productNotToshow={product?._id} title='You may also like' categoryId={product?.category} />
                )}
              </div>
            </div>
          </div>
        )
      }


    </div >
  )
}

export default ProductPage
