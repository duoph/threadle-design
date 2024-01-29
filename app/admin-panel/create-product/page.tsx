'use client';

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios
import { PulseLoader } from "react-spinners";

const CreateProduct = () => {
    const router = useRouter();

    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [categoryTitle, setCategoryTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)


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
            if (coverImage) {
                const file = await fetch(coverImage).then((res) => res.blob());
                formData.append("file", file);
            }
            // Make a POST request to your backend endpoint
            const res = await axios.post("/api/admin-panel/create-category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res)
            setIsLoading(false)
            toast.success("Category created successfully");
            router.push("/");
        } catch (error) {
            setIsLoading(false)
            console.error("Error creating category:", error);
            toast.error("Failed to create category");
        }
    };

    return (
        <div className='flex flex-col gap-3 py-5 md:px-10 px-5'>
            <div className='flex gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
                <h1 className='font-bold text-[30px]'>Create new Category</h1>
            </div>

            <form action="" className="flex flex-col gap-3 bg-gray-300">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Product Name</label>
                    <input className="bg-td-primary px-5 py-3 rounded-2xl" type="text" id="title" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="desc" className="font-semibold">Description</label>
                    <input className="bg-td-primary px-5 py-3 rounded-2xl" type="text" id="desc" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Product Name</label>
                    <textarea rows={6} className="bg-td-primary px-5 py-3 rounded-2xl" id="title" />
                </div>
            </form>

        </div >
    );
}

export default CreateProduct;