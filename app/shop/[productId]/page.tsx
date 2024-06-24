"use client"

import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosCheckmark, IoMdClose } from 'react-icons/io'
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
import { FaPhoneAlt, FaAddressCard } from 'react-icons/fa';
import { FaLocationDot, FaSquareWhatsapp } from 'react-icons/fa6';
import { RiAccountCircleFill } from 'react-icons/ri';


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
  const [isDetails, setIsDetailsMenu] = useState<boolean>(false)

  const [isAddingToCart, setIsAddingToCart] = useState<boolean>();

  const [isSubmiting, setIsSubmiting] = useState<boolean>()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsAppNumber: '',
    address: '',
    pincode: '',
  });




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
      console.log(res)
      if (res?.data?.user) {
        setUser(res?.data?.user);
        setFormData({
          name: res.data.user.name,
          phone: res.data.user.phone,
          whatsAppNumber: res?.data?.user?.whatsAppNumber,
          address: res.data.user.address,
          pincode: res.data.user.pincode,
        });
      }
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
        setWishListIds((prev) => prev.filter(id => id !== productId))
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
      if (!currentUser?.token) {
        router.push('/account/login')
        return toast.error("Login to your account");
      }
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
      setIsAddingToCart(true)
      if (!currentUser?.token) {
        setIsAddingToCart(false)
        router.push('/account/login')
        return toast.error("Login to your account");
      }
      if (!selectedColor || !selectedSize) {
        setIsAddingToCart(false)
        return toast.error("Select Size and Color");
      }

      const res = await axios.post("/api/cart", {
        productId, color: selectedColor, size: selectedSize, quantity, price: product?.salePrice || product?.regularPrice, imageURL: product?.coverImageURL, title: product?.title
      })

      console.log(res)

      if (res.data.success === true) {
        toast.success(res.data.message)
        cartItemCountFetch()
      }

      if (res.data.success === false) {
        toast.error(res.data.message)
      }

      setIsAddingToCart(false)
    } catch (error) {
      setIsAddingToCart(false)
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
      if (!product?.isCustom && !currentUser?.isAdmin) {
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
      if (!product?.isCustom && !currentUser?.isAdmin) {
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
        pincode: user?.pincode,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

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


      const res = await axios.post("/api/razorpay", {
        totalAmount: product?.salePrice || product?.regularPrice,
      })

      console.log(res)

      setIsSubmiting(false);

      const order = res.data.order
      const options = {
        order_id: order?.id,
        name: 'Threadle Designs',
        image: "/td.png",
        theme: "green",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            toast.success("Payment successful!");
            productPaid(response);
            router.push(`/account/${currentUser?.userId}/orders`)
          } else {
            toast.error("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: formData.name,
          email: "jdoe@example.com",
          contact: formData.phone,
        },
      };
      setIsLoading(false)

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      setIsSubmiting(false);
      setIsDetailsMenu(false)
      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  };

  const handleBuyNow = async () => {
    try {
      if (!currentUser?.token) {
        setIsAddingToCart(false)
        router.push('/account/login')
        return toast.error("Login to your account");
      }
      fetchUser()
      if (!selectedColor || !selectedSize) {
        setIsLoading(false);
        return toast.error("Select Size and Color");
      }
      setIsDetailsMenu(true)
    } catch (error) {
      setIsDetailsMenu(false)
      console.log(error)
    }

  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {

    setIsSubmiting(true);

    // Validate pincode
    if (!currentUser?.token) {
      router.push('/account/login')
      return toast.error("Login to your account");
    }


    if (formData.name.length < 2) {
      setIsSubmiting(false);
      return toast.error("Enter a valid name");
    }

    if (formData.phone.length != 10) {
      setIsSubmiting(false);
      return toast.error("Enter a valid phone");
    }


    if (formData.address.length < 7) {
      setIsSubmiting(false);
      return toast.error("Enter a valid Address");
    }


    if (!/^\d{6}$/.test(formData.pincode)) {
      setIsSubmiting(false);
      return toast.error("Enter a valid pincode");
    }


    try {
      const res = await axios.put(`/api/user/${currentUser?.userId}`, formData);
      console.log(res)

      if (res.data?.success === false) {
        return toast.error(res.data.message);
      }

      handlePayment()
    } catch (error) {
      setIsSubmiting(false);
      console.log(error);
      toast.error('Failed to update profile');
    }
  };




  document.title = product?.title || "Shop Now"


  const wpLink = `https://api.whatsapp.com/send?phone=919074063723&text=%F0%9F%8C%9F%20I%27m%20interested%20in%20your%20product.%20%F0%9F%8C%9F%0Ahttps%3A%2F%2Fwww.threadledesigns.com%2Fshop%2F${productId}`;



  return (
    <div className='w-full relative px-5 py-3 md:px-10 flex flex-col gap-3 mb-5 '>

      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />



      <Head>
        <title>{product?.title || "Shop Now"}</title>
        <meta property='og:title' content={product?.title || "Shop Now"} />
        <meta property="og:description" content={product?.desc} />
        <meta property="og:image" content={product?.coverImageURL || "/greendress.png"} />
        <meta property="image" content={product?.coverImageURL || "/greendress.png"} />
        <meta property="og:url" content={`https://www.threadledesigns.com/shop/${productId}`} />
      </Head>


      {
        !product ? (
          <div className="w-full h-[70vh] flex items-center justify-center px-5 py-3 md:px-10 gap-3 mb-5 ">
            <PulseLoader color={"#014051"} />
          </div>
        ) : (
          <div className='flex flex-col w-full gap-3'>
            <div className='flex flex-col w-full gap-1 items-center justify-center bg-slate-100 '>
              <div className='relative w-[300px] h-[300px] '>
                <Image priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "contain" }} src={previewImage || product?.coverImageURL || product?.moreImagesURLs[0] || product?.moreImagesURLs[1] || product?.moreImagesURLs[2] || product?.moreImagesURLs[3] || "/noImage.jpg"} alt='greenDress' className='h-[350px]' fill={true} />
              </div>

              {product?.moreImagesURLs?.length !== 0 && <div className='h-[5rem] bg-gray-200 w-full flex items-center justify-center gap-1'>
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

                {!currentUser?.isAdmin && (
                  <div>
                    {wishlistIds?.includes(`${productId}`) ? (
                      <button onClick={handleDislike} className='flex  w-[43px] border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                        <FaHeart className='text-center   text-td-secondary hover:scale-110' size={24} />
                      </button>
                    ) : (<button onClick={handleLike} className='flex  w-[43px] border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                      <CiHeart className='text-center   text-td-secondary hover:scale-110' size={24} />
                    </button>)}
                  </div>
                )}

              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm flex items-center justify-center gap-1 font-light'>All over india free delivery
                  <div className='relative h-[14px] w-[14px] flex items-center justify-center'>
                    <Image priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={"/india.png"} fill={true} alt="Indian flag" />
                  </div>
                </span>
                {product?.isCustom && (<div>
                  <Link target='_blank' href={wpLink} className='bg-black px-3 py-2 rounded-md flex gap-2'>
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
                      <button key={i} onClick={() => handleSize(size)} className={`px-4 py-2 rounded-md ${selectedSize === size ? "bg-td-primary text-white" : "bg-gray-200"}`}>{size}</button>
                    ))}
                  </div>
                </div>

                {!product?.isCustom && product?.inStock && !currentUser?.isAdmin ? (
                  <div className='flex flex-col gap-3 font-semibold w-full'>
                    <span className='bg-gray-200 flex items-center justify-between gap-4 px-8 py-2 rounded-md w-1/2'>
                      <span className='cursor-pointer' onClick={() => handleQuantity("decrement")}>-</span>
                      <span>{quantity}</span>
                      <span className='cursor-pointer' onClick={() => handleQuantity("increment")}>+</span>
                    </span>
                    <div className='flex gap-3'>
                      <button onClick={addToCart} className='w-1/2 py-2 bg-td-secondary rounded-md text-white'>  {isAddingToCart ? <PulseLoader color='white' /> : "Add to Cart"} </button>
                      <button onClick={handleBuyNow} className='w-1/2 py-2 bg-td-secondary rounded-md text-white flex items-center justify-center'>
                        Buy Now
                      </button>
                    </div>
                  </div>
                ) : (
                  null
                )}

              </div>
              <div className='mt-5 w-full'>
                <p className='break-all w-full font-light'>{product?.desc}</p>
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


      {/* The address and phone confirmation modal */}

      {isDetails && (
        <div className='fixed flex items-center justify-center bg-black bg-opacity-30 top-0 right-0 min-h-screen w-full z-[50] pb-10'>
          <div className='bg-white relative rounded-md shadow-2xl px-5 py-5 flex flex-col items-center justify-center'>
            <IoMdClose onClick={() => setIsDetailsMenu(false)} className="absolute top-6 right-5 cursor-pointer text-td-secondary  rounded-full p-1" size={30} />
            <h1 className='text-td-secondary text-center text-[25px]  font-bold text-3xl'>Confirm Address</h1>
            <div className="flex  flex-col items-center justify-center w-full min-h-full gap-2">
              <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3  px-5 py-8 rounded-md w-full '>
                <div className='flex items-center justify-center gap-2 w-full'>
                  <RiAccountCircleFill size={30} />
                  <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} className=' px-5  py-2 rounded-md border w-full' />
                </div>
                <div className='flex items-center w-full justify-center gap-3'>
                  <FaPhoneAlt size={24} />
                  <div className='flex items-center justify-center rounded-md border w-full'>
                    <span className='pl-2'>+91</span>
                    <input
                      type="string"
                      // pattern='0-9'
                      id="phone"
                      name="phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='Phone'
                      className='w-full px-3 py-3 focus:outline-none' />
                  </div>
                </div>
                <div className='flex items-start justify-center gap-2 w-full '>
                  <FaAddressCard size={30} />
                  <textarea id="address" name="address" className=' px-5  py-2 w-full rounded-md border min-h-[100px]' placeholder='Address' value={formData.address} onChange={handleChange} />
                </div>
                <div className='flex items-center justify-center gap-2 w-full'>
                  <FaLocationDot size={30} />
                  <input type="pincode" name="pincode" placeholder='Pincode' className='border px-5  w-full py-2 rounded-md' value={formData.pincode} onChange={handleChange} />
                </div>
              </form>
              {user && (<button onClick={handleSubmit} disabled={isSubmiting} className={`px-5 rounded-md py-3 border bg-td-secondary text-white font-bold`} type='submit'>{isSubmiting ? <PulseLoader color="white" size={9} /> : "Next"}</button>)}
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default ProductPage;
