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

const EditProduct = () => {

    const router = useRouter();
    const { productId } = useParams()



    // const [fetchedImageURL, setFetchedImageURL] = useState<string | null>(null);
    const [inStock, setInStock] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    const [productTitle, setProductTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const fetchCategory = async () => {
        try {
            const response = await axios.get(`/api/product/${productId}`)
            console.log(response.data.product)
            setProductTitle(response.data.product.title)
            setInStock(response.data.product.inStock)
            setCategory(response.data.product.category)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchCategory()
    }, [])



    // const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setCoverImage(imageUrl);
    //     }
    // };


    // const handleSubmit = async () => {
    //     try {
    //         if (!categoryTitle) {
    //             toast.error("Please enter a category title");
    //             return;
    //         }
    //         setIsLoading(true)
    //         const formData = new FormData();
    //         formData.append("title", categoryTitle);

    //         if (fetchedImageURL) {
    //             formData.append("imageURL", fetchedImageURL);
    //         }

    //         if (coverImage) {
    //             const file = await fetch(coverImage).then((res) => res.blob());
    //             formData.append("file", file);
    //         }
    //         // Make a POST request to your backend endpoint
    //         const res = await axios.put(`/api/category/${categoryId}`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });
    //         console.log(res)
    //         setIsLoading(false)
    //         toast.success("Category updated successfully");
    //         router.push("/admin-panel/view-categories");
    //     } catch (error) {
    //         setIsLoading(false)
    //         console.error("Error updating category:", error);
    //         toast.error("Failed to create category");
    //     }
    // };


    return (
        <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
            <div className='flex gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
                <h1 className='font-bold text-[30px]'>Update Product</h1>
            </div>

            {/* Product Details */}
            <div className='flex flex-col w-full gap-4'>
                <h1 className='text-[20px] font-bold'>Product Details</h1>
                <h1 className="font-bold">Product Title</h1>
                <input type="text" name='title' onChange={(e) => setProductTitle(e.target.value)} value={productTitle} placeholder="Title" className='bg-gray-200 rounded-2xl px-5 py-3' />
            </div>

            < div className="w-full flex items-center justify-center py-5" >
                <button className=" flex items-center justify-center h-10 px-5 py-3 bg-td-secondary hover:bg-td-primary text-white rounded-2xl font-semibold w-full">
                    {isLoading && (
                        <PulseLoader color="#ffffff" size={15} />
                    )}
                    {!isLoading && (
                        <span onClick={() => { }} className="text-[15px] w-full">Update Product</span>
                    )}
                </button>
            </ div>
        </div >
    );
}

export default EditProduct;