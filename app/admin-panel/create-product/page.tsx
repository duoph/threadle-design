'use client';

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios
import { PulseLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa6";

const CreateProduct = () => {
    const router = useRouter();

    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [image3, setImage3] = useState<string | null>(null);
    const [image4, setImage4] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleDisplayImage = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            switch (i) {
                case 0:
                    setCoverImage(imageUrl);
                    break;
                case 1:
                    setImage1(imageUrl);
                    break;
                case 2:
                    setImage2(imageUrl);
                    break;
                case 3:
                    setImage3(imageUrl);
                    break;
                case 4:
                    setImage4(imageUrl);
                    break;
                default:
                    break;
            }
        }
    };


    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
        } catch (error) {

        }
    }


    return (
        <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
            <div className='flex gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
                <h1 className='font-bold text-[30px]'>Create new Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input className="bg-gray-200 px-5 py-3 rounded-2xl" type="text" id="title" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Description</label>
                    <textarea rows={6} className="bg-gray-200 px-5 py-3 rounded-2xl" id="title" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="font-semibold">Category</label>
                    <select id="category" className="bg-gray-200 px-5 py-3 rounded-2xl">
                        <option value="someOption">Some option</option>
                        <option value="otherOption">Other option</option>
                    </select>
                </div>
                <div className="flex flex-row gap-1 w-full">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="title" className="font-semibold">Regular Price</label>
                        <input className="bg-gray-200 px-5 py-3 rounded-2xl" id="title" />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="title" className="font-semibold">Sale Price(Optional)</label>
                        <input className="bg-gray-200 px-5 py-3 rounded-2xl" id="title" />
                    </div>
                </div>
                <h1 className="text-[15px] font-semibold">Cover Image</h1>
                <div className="flex items-center justify-center ">
                    <div className="flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] ">
                        {!coverImage && (
                            <label htmlFor="coverImage" className="font-semibold w-full h-full flex flex-col items-center justify-center">
                                <CiSquarePlus size={24} />
                                <span className="text-sm text-gray-500">Add Cover Image</span>
                            </label>
                        )}
                        {coverImage && (
                            <Image className="rounded-2xl" src={coverImage} alt="Image" height={350} width={350} />
                        )}
                        <input type="file" className="hidden" id="coverImage" onChange={(e) => handleDisplayImage(e, 0)} />
                    </div>
                </div>
                <h1 className="text-[15px] font-semibold">More Images</h1>
                <div className="flex md:flex-row flex-row flex-wrap items-center justify-center gap-2">
                    <div className=" flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] overflow-hidden">
                        {!image1 && (
                            <label htmlFor="image1" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={24} />
                                <span className="text-sm text-gray-500">Add Image</span>
                            </label>
                        )}
                        {image1 && (
                            <Image className="rounded-2xl" src={image1} alt="Image" height={350} width={350} />
                        )}
                        <input type="file" className="hidden" id="image1" onChange={(e) => handleDisplayImage(e, 1)} />
                    </div>

                    {image1 && (
                        <div className=" flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] ">
                            {!image2 && (
                                <label htmlFor="image2" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <CiSquarePlus size={24} />
                                    <span className="text-sm text-gray-500">Add Image</span>
                                </label>
                            )}
                            {image2 && (
                                <Image className="rounded-2xl" src={image2} alt="Image" height={350} width={350} />
                            )}
                            <input type="file" className="hidden" id="image2" onChange={(e) => handleDisplayImage(e, 2)} />
                        </div>
                    )}
                    {image2 && (
                        <div className=" flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] ">
                            {!image3 && (
                                <label htmlFor="image3" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <CiSquarePlus size={24} />
                                    <span className="text-sm text-gray-500">Add Image</span>
                                </label>
                            )}
                            {image3 && (
                                <Image className="rounded-2xl" src={image3} alt="Image" height={350} width={350} />
                            )}
                            <input type="file" className="hidden" id="image3" onChange={(e) => handleDisplayImage(e, 3)} />
                        </div>
                    )}
                    {image3 && (
                        <div className=" flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] ">
                            {!image4 && (
                                <label htmlFor="image4" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <CiSquarePlus size={24} />
                                    <span className="text-sm text-gray-500">Add Image</span>
                                </label>
                            )}
                            {image4 && (
                                <Image className="rounded-2xl" src={image4} alt="Image" height={350} width={350} />
                            )}
                            <input type="file" className="hidden" id="image4" onChange={(e) => handleDisplayImage(e, 4)} />
                        </div>
                    )}

                </div>
                <div>

                </div>
                <button type="submit" className="w-full bg-td-secondary text-white px-5 py-3 rounded-2xl ">Create Product</button>
            </form>
        </div >
    );
}

export default CreateProduct;