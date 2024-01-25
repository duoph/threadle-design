'use client'

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";





const AddProduct = () => {

  const router = useRouter()

  return (
    <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
      <div className='flex gap-2 items-center justify-start'>
        <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
        <h1 className='font-bold text-[30px]'>Add new Product</h1>
      </div>
      {/* Product Details */}
      <div className='flex flex-col w-full gap-4'>
        <h1 className='font-bold'>Product Details</h1>
        <label htmlFor="tile">Product Title</label>
        <input type="text" name='title' className='bg-gray-200 rounded-2xl px-5 py-3' />
        <div className='flex items-center justify-center w-full gap-3'>
          <div className='flex flex-col w-full gap-2'>
            <h1 className="Text-[25px] font-bold">Category</h1>
            <select className='bg-gray-200 rounded-2xl px-5 py-3'>
              <option value="someOption">Some option</option>
              <option value="otherOption">Other option</option>
            </select>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <h1 className="Text-[25px] font-bold">In Stock</h1>
            <select className='bg-gray-200 rounded-2xl px-5 py-3'>
              <option value="someOption">Yes</option>
              <option value="otherOption">No</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className="Text-[25px] font-bold">Description</h1>
          <textarea rows={10} className='bg-gray-200 rounded-2xl px-5 py-3' minLength={100} name="desc" id="desc" >
            fsef
          </textarea>
        </div>

        {/* Sizes */}
        <div className=' gap-3'>
          <h1 className="Text-[25px] font-bold">Available Sizes</h1>
          <div className='flex gap-3'>
            <input type="checkbox" />
            <span>Small</span>
            <input type="checkbox" />
            <span>Medium</span>
            <input type="checkbox" />
            <span>Large</span>
            <input type="checkbox" />
            <span>XL</span>
            <input type="checkbox" />
            <span>XXL</span>
          </div>
        </div>
      </div>


      {/* Pricing */}

      <div className='w-full flex gap-3 flex-col'>
        <h1>Pricing</h1>
        <div className='flex gap-3 w-full'>
          <div className='flex flex-col gap-3 w-1/2'>
            <span >Regular Price</span>
            <input type="text" name='title' className='bg-gray-200 rounded-2xl px-5 py-3' />
          </div>
          <div className='flex flex-col gap-3 w-1/2'>
            <span >Sale Price</span>
            <input type="text" name='title' className='bg-gray-200 rounded-2xl px-5 py-3 w-full' />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="Text-[25px] font-bold">Available Colors</h1>
        <label htmlFor="tile">Add Color Code</label>
        <div className="flex gap-3">
          <input type="text" name='title' className='bg-gray-200 rounded-2xl px-5 py-3' />
          <button className="bg-td-primary rounded-2xl px-3 py-3 text-white">Add</button>
        </div>
        <div className="flex gap-3 items-center justify-start">
          <h1>Selected Colors : </h1>
          <span className='h-[25px] bg-[#421f4a] w-[25px] rounded-[50%] inline-block'></span>
          <span className='h-[25px] bg-[#3f9693] w-[25px] rounded-[50%] inline-block'></span>
          <span className='h-[25px] bg-[#783246] w-[25px] rounded-[50%] inline-block'></span>
        </div>
      </div>

    </div >
  )
}

export default AddProduct;