'use client';

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios
import { PulseLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa6";
import { Category } from "@/types";

const CreateProduct = () => {
    const router = useRouter();

    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [regularPrice, setRegularPrice] = useState<string>("")
    const [salePrice, setSalePrice] = useState<string>("")
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [image3, setImage3] = useState<string | null>(null);
    const [image4, setImage4] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fetchedCategory, setFetchedCategory] = useState<[] | undefined>([])





    const getAllCategories = async () => {
        try {
            const response = await axios.get('/api/category')
            console.log(response.data.tdCategory)
            setFetchedCategory(response.data.tdCategory)
        } catch (error) {
            console.log(error)
        }
    }



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
    

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setCategory(newValue);
    };


    const imageFiler = async (e: any) => {
        const file = await fetch(e).then((res) => res.blob());
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();


            if (!title || !desc || !regularPrice || !coverImage || !image1 || !image2 || !image3 || !image4) {
                return toast.error("Some fields are missig");
            }


            setIsLoading(true)
            const formData = new FormData();

            formData.append("title", title);
            formData.append("categoryId", category);
            formData.append("desc", desc);
            formData.append("regularPrice", regularPrice);

            if (salePrice) {
                formData.append("salePrice", salePrice);
            }

            // Handle all images in a loop
            const imageFields = ["coverImage", "image1", "image2", "image3", "image4"];
            for (const fieldName of imageFields) {
                const imageUrl = (fieldName === "coverImage") ? coverImage : (fieldName === "image1") ? image1 : (fieldName === "image2") ? image2 : (fieldName === "image3") ? image3 : image4;

                if (imageUrl) {
                    const imageFile = await fetch(imageUrl).then((res) => res.blob());
                    formData.append(fieldName, imageFile);
                }
            }

            const response = await axios.post('/api/product', formData);

            toast.success('Product created successfully!');

            // Redirect to the product details page or any other desired page
            router.push(`/products/${response.data.productId}`);
        } catch (error) {
            // Handle error, show toast, or log the error
            console.error("Error creating product:", error);
            toast.error('Failed to create product. Please try again.');
        }
    };


    useEffect(() => {
        getAllCategories()
    }, [])


    console.log(category)

    return (
        <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
            <div className='flex gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
                <h1 className='font-bold text-[30px]'>Create new Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-2xl" type="text" id="title" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Description</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={6} className="bg-gray-200 px-5 py-3 rounded-2xl" id="title" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="font-semibold">Category</label>


                    <select onChange={handleSelectChange} id="category" className="bg-gray-200 px-5 py-3 rounded-2xl text-black">
                        <option className="px-5 py-3 " value={"default"}>Select category</option>
                        {fetchedCategory && fetchedCategory.map((category: Category, i) => (
                            <option value={category._id}>{category.categoryName}</option>
                        ))}
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
                <div className="flex flex-col gap-2 items-center justify-center ">
                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] overflow-hidden shadow-xl">
                        {!coverImage && (
                            <label htmlFor="coverImage" className="font-semibold w-full h-full flex flex-col items-center justify-center">
                                <CiSquarePlus size={24} />
                                <span className="text-sm text-gray-500">Add Cover Image</span>
                            </label>
                        )}
                        {coverImage && (

                            <Image className="rounded-2xl -z-10" src={coverImage} alt="Image" height={350} width={350} />

                        )}
                        <input type="file" className="hidden" id="coverImage" onChange={(e) => handleDisplayImage(e, 0)} />
                        {coverImage && (
                            <MdDelete onClick={() => setCoverImage("")} className="bg-red-500 rounded-2xl z-10 text-white cursor-pointer absolute bottom-3 w-[36px] h-[36px]" size={24} />
                        )}
                    </div>
                </div>
                <h1 className="text-[15px] font-semibold">More Images</h1>
                <div className="flex md:flex-row flex-row flex-wrap items-center justify-center gap-2">
                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] overflow-hidden shadow-xl">
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
                        {image1 && (
                            <MdDelete onClick={() => setImage1("")} className="bg-red-500 rounded-2xl z-10 text-white cursor-pointer absolute bottom-3 w-[36px] h-[36px]" size={24} />
                        )}
                    </div>

                    {image1 && (
                        <div className="relative flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] overflow-hidden shadow-xl ">
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
                            {image2 && (
                                <MdDelete onClick={() => setImage2("")} className="bg-red-500 rounded-2xl z-10 text-white cursor-pointer absolute bottom-3 w-[36px] h-[36px]" size={24} />
                            )}
                        </div>
                    )}
                    {image2 && (
                        <div className="relative flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] overflow-hidden shadow-xlv">
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
                            {image3 && (
                                <MdDelete onClick={() => setImage3("")} className="bg-red-500 rounded-2xl z-10 text-white cursor-pointer absolute bottom-3 w-[36px] h-[36px]" size={24} />
                            )}
                        </div>
                    )}
                    {image3 && (
                        <div className="relative flex flex-col items-center justify-center gap-1 border rounded-2xl w-[300px] h-[300px] overflow-hidden shadow-xl">
                            {!image4 && (
                                <label htmlFor="image4" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer ">
                                    <CiSquarePlus size={24} />
                                    <span className="text-sm text-gray-500">Add Image</span>
                                </label>
                            )}
                            {image4 && (
                                <Image className="rounded-2xl" src={image4} alt="Image" height={350} width={350} />
                            )}
                            <input type="file" className="hidden" id="image4" onChange={(e) => handleDisplayImage(e, 4)} />
                            {image4 && (
                                <MdDelete onClick={() => setImage4("")} className="bg-red-500 rounded-2xl z-10 text-white cursor-pointer absolute bottom-3 w-[36px] h-[36px]" size={24} />
                            )}
                        </div>
                    )}

                </div>
                <div>

                </div>
                <button className=" flex items-center justify-center h-10 px-5 py-3 bg-td-secondary text-white rounded-2xl font-semibold w-full">
                    {isLoading && (
                        <PulseLoader color="#ffffff" size={15} />
                    )}
                    {!isLoading && (
                        <span className="text-[15px] w-full">Create Product</span>
                    )}
                </button>
            </form >
        </div >
    );
}

export default CreateProduct;