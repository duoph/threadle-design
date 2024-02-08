'use client';

import { useParams, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const EditCategory = () => {

    const router = useRouter();
    const { categoryId } = useParams()



    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [fetchedImageURL, setFetchedImageURL] = useState<string | null>(null);
    const [categoryTitle, setCategoryTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const fetchCategory = async () => {
        try {
            const response = await axios.get(`/api/category/${categoryId}`)
            console.log(response.data.category)
            setCategoryTitle(response.data.category.categoryName)
            setFetchedImageURL(response.data.category.imageURL)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchCategory()
    }, [])



    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
        }
    };


    const handleSubmit = async () => {
        try {
            if (!categoryTitle) {
                toast.error("Please enter a category title");
                return;
            }
            setIsLoading(true)
            const formData = new FormData();
            formData.append("title", categoryTitle);

            if (fetchedImageURL) {
                formData.append("imageURL", fetchedImageURL);
            }

            if (coverImage) {
                const file = await fetch(coverImage).then((res) => res.blob());
                formData.append("file", file);
            }
            // Make a POST request to your backend endpoint
            const res = await axios.put(`/api/category/${categoryId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res)
            setIsLoading(false)
            toast.success("Category updating successfully");
            router.push("/admin-panel");
        } catch (error) {
            setIsLoading(false)
            console.error("Error updating category:", error);
            toast.error("Failed to create category");
        }
    };


    return (
        <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
            <div className='flex gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
                <h1 className='font-bold text-[30px]'>Update Category</h1>
            </div>

            {/* Product Details */}
            <div className='flex flex-col w-full gap-4'>
                <h1 className='text-[20px] font-bold'>Category Details</h1>
                <h1 className="font-bold">Category Title</h1>
                <input type="text" name='title' onChange={(e) => setCategoryTitle(e.target.value)} value={categoryTitle} placeholder="Title" className='bg-gray-200 rounded-2xl px-5 py-3' />
            </div>

            {/* Images */}
            <h1 className=" font-bold">Cover Image</h1>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex px-5 items-center justify-center gap-3  w-full  ">
                    {!coverImage && !fetchedImageURL && (
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
                    {!coverImage && fetchedImageURL && (
                        <div className="w-full flex flex-col items-center justify-center gap-2">
                            <Image src={fetchedImageURL} alt="Cover" className="w-[290px] h-[290px] object-cover rounded-2xl" height={150} width={150} />

                            <button onClick={() => setFetchedImageURL(null)} className="bg-red-700 px-3 py-2 rounded-2xl text-white">
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
            {/* Button */}
            < div className="w-full flex items-center justify-center py-5" >
                <button className=" flex items-center justify-center h-10 px-5 py-3 bg-td-secondary hover:bg-td-primary text-white rounded-2xl font-semibold w-full">
                    {isLoading && (
                        <PulseLoader color="#ffffff" size={15} />
                    )}
                    {!isLoading && (
                        <span onClick={handleSubmit} className="text-[15px] w-full">Update Category</span>
                    )}
                </button>
            </ div>
        </div >
    );
}

export default EditCategory;