'use client'

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";
import { MdDelete } from "react-icons/md";



const AddProduct = () => {
  const router = useRouter();

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [moreImages, setMoreImages] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState<string | null>(null);
  const [colorCode, setColorCode] = useState<string[]>([]);

  const handleAddColors = () => {
    if (colorInput) {
      setColorCode((prev) => [...prev, colorInput]);
      setColorInput(""); // Clear the input field after adding the color
    }
  };
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
  console.log(colorCode)
  console.log(colorInput)

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
          </textarea>
        </div>


        {/* Sizes */}
        <div className=' gap-3 flex flex-col '>
          <h1 className=" font-bold">Available Sizes</h1>
          <div className='flex gap-3 flex-wrap'>
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


      {/* Available color */}
      <div className="flex flex-col gap-3">
        <h1 className="font-bold">Available Colors</h1>
        <label htmlFor="tile">Add Color Code</label>
        <div className="flex gap-3">
          <input
            type="text"
            name="title"
            value={colorInput || ""}
            className="bg-gray-200 rounded-2xl px-5 py-3"
            onChange={(e) => setColorInput(e.target.value)}
          />
          <button
            className="bg-td-primary rounded-2xl px-3 py-3 text-white"
            onClick={handleAddColors}
          >
            Add
          </button>
        </div>
        <div className="flex gap-3 items-center justify-start">
          <h1>Selected Colors :</h1>
          {colorCode.map((color, index) => (
            <span
              key={index}
              style={{ backgroundColor: color }}
              className={`h-[50px] cursor-pointer w-[50px] rounded-[50%] inline-block`}
            ></span>
          ))}
        </div>
      </div>



      {/* Images */}

      <div className="flex  flex-col w-full gap-3">
        <h1 className=" font-bold">Images</h1>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-semibold">Cover Image</span>
          <div className="flex px-5 items-center justify-center gap-3  w-full  ">
            {!coverImage && (
              <label htmlFor="coverImage" className="w-[290px] rounded-2xl border flex flex-col items-center justify-center h-[290px]">
                <span className="font-bold">Add Image</span>
                <CiSquarePlus size={24} />
              </label>
            )}
            {coverImage && (
              <div className="w-full flex flex-col items-center justify-center gap-2">
                <Image src={coverImage} alt="Cover" className="w-[290px] h-[290px] object-cover rounded-2xl" height={150} width={150} />
                <button onClick={() => setCoverImage(null)} className="bg-red-700 px-3 py-2 rounded-2xl text-white">
                  <MdDelete size={24} />
                </button>
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
          <div className="flex flex-col px-5 items-center justify-center gap-3 md:w-full w-full ">
            {moreImages.length < 4 ? (
              <div className="w-full flex items-center justify-center">
                <label htmlFor="moreImages" className="w-[290px] rounded-2xl border flex flex-col items-center justify-center h-[290px]">
                  <span className="font-bold">Add Image</span>
                  <CiSquarePlus size={24} />
                </label>
                <input type="file" className="hidden" id="moreImages" accept="image/*" onChange={handleMoreImageChange} />
              </div>
            ) : null}
            <div className="flex md:flex-row flex-col gap-4 py-5">
              {moreImages.map((imageUrl, index) => (
                <div key={index} className="w-full flex flex-col items-center justify-center gap-2">
                  <Image width={50} height={50} src={imageUrl} alt={`More Image ${index + 1} `} className="w-[290px] h-[290px] object-cover rounded-2xl" />
                  <button onClick={() => unSelectImage(index)} className="bg-red-700 px-3 py-2 rounded-2xl text-white">
                    <MdDelete size={24} />
                  </button>
                </div>
              ))}
            </div>

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