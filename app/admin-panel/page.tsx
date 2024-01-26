'use client'

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";




const AddProduct = () => {
  const router = useRouter();

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [moreImages, setMoreImages] = useState<string[]>([]);

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const handleMoreImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setMoreImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const unSelectImage = (indexToRemove: number) => {
    setMoreImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  console.log(coverImage);
  console.log(moreImages);

  return (
    <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
      <div className='flex gap-2 items-center justify-start'>
        <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
        <h1 className='font-bold text-[30px]'>Add new Product</h1>
      </div>
      {/* Product Details */}
      <div className='flex flex-col w-full gap-4'>
        <h1 className='text-[20px] font-bold'>Product Details</h1>
        <h1 className=" font-bold">Product Title</h1>
        <input type="text" name='title' className='bg-gray-200 rounded-2xl px-5 py-3' />
        <div className='flex items-center justify-center w-full gap-3'>
          <div className='flex flex-col w-full gap-2'>
            <h1 className=" font-bold">Category</h1>
            <select className='bg-gray-200 rounded-2xl px-5 py-3'>
              <option value="someOption">Some option</option>
              <option value="otherOption">Other option</option>
            </select>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <h1 className=" font-bold">In Stock</h1>
            <select className='bg-gray-200 rounded-2xl px-5 py-3'>
              <option value="someOption">Yes</option>
              <option value="otherOption">No</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className=" font-bold">Description</h1>
          <textarea rows={10} className='bg-gray-200 rounded-2xl px-5 py-3' minLength={100} name="desc" id="desc" >
            fsef
          </textarea>
        </div>

        {/* Sizes */}
        <div className=' gap-3'>
          <h1 className=" font-bold">Available Sizes</h1>
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
        <h1 className=" font-bold">Pricing</h1>
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
        <h1 className=" font-bold">Available Colors</h1>
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



      {/* Images */}

      <div className="flex flex-col w-full gap-3">
        <h1 className=" font-bold">Images</h1>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-semibold">Cover Image</span>
          <div className="flex  px-5 flex-col items-center justify-center gap-3 md:w-[400px]  w-full h-[200px]">
            {!coverImage && (
              <label htmlFor="coverImage" className="w-full flex flex-col items-center justify-center">
                <span className="font-bold">Add Image</span>
                <CiSquarePlus size={24} />
              </label>
            )}
            {coverImage && (
              <div className="flex flex-col items-center justify-center gap-2 py-5 w-full">
                <img src={coverImage} alt="Cover" className="object-cover" height={150} width={150} />
                <button onClick={() => setCoverImage(null)} className="bg-red-700 px-3 py-2 rounded-2xl text-white">Remove</button>
              </div>
            )}
            <input
              id="coverImage"
              type="file"
              onChange={handleCoverImageChange}
              className="hidden"
              accept="image/*"

            />
          </div>
        </div>

        {/* More Images */}

        <div className="w-full">
          <span className="font-semibold">More Images</span>
          <div className="flex px-5 items-center justify-center gap-3 md:w-[400px] w-full h-[200px]">
            {moreImages.length < 3 ? (
              <>
                <label htmlFor="moreImages" className="w-full h-full flex flex-col items-center justify-center">
                  <span className="font-bold">Add Image</span>
                  <CiSquarePlus size={24} />
                </label>
                <input type="file" className="hidden" id="moreImages" accept="image/*" onChange={handleMoreImageChange} />
              </>
            ) : null}
            {moreImages.map((imageUrl, index) => (
              <div key={index} className="w-full flex flex-col items-center justify-center gap-2">
                <img src={imageUrl} alt={`More Image ${index + 1}`} className="w-full h-full object-cover" />
                <button onClick={() => unSelectImage(index)} className="bg-red-700 px-3 py-2 rounded-2xl text-white">Remove</button>
              </div>
            ))}

          </div>
        </div>
      </div >


      {/* Button */}

      < div className="w-full flex items-center justify-center py-5" >
        <button className="px-5 py-3 bg-td-secondary text-white rounded-2xl font-semibold">Add Product</button>
      </ div>
    </div >
  );
}

export default AddProduct;