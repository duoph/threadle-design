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
import { Category } from "@/types";

const EditProduct = () => {

    const router = useRouter();
    const { productId } = useParams()



    // const [fetchedImageURL, setFetchedImageURL] = useState<string | null>(null);
    const [inStock, setInStock] = useState("");
    const [regularPrice, setRegularPrice] = useState<string>("");
    const [salePrice, setSalePrice] = useState<string>("");
    const [productTitle, setProductTitle] = useState<string>("");
    const [productDesc, setProductDesc] = useState<string>("");
    const [fetchedCategory, setFetchedCategory] = useState<[] | undefined>([])
    const [categoryId, setCategoryId] = useState<string>("")
    const [fetchedCategoryId, setFetchedCategoryId] = useState<string>("")
    const [fetchedCategoryName, setFetchedCategoryName] = useState<string>("")
    const [categoryName, setCategoryName] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/product/${productId}`)
            console.log(response.data.product)
            const { title, desc, regularPrice, salePrice, inStock, categoryId, categoryName } = response.data.product;
            setProductTitle(title);
            setProductDesc(desc);
            setRegularPrice(regularPrice);
            setSalePrice(salePrice);
            setInStock(inStock);
            setFetchedCategoryName(categoryName)
            setFetchedCategoryId(categoryId);
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axios.get('/api/category')
            console.log(response.data.tdCategory)
            setFetchedCategory(response.data.tdCategory)
        } catch (error) {
            console.log(error)
        }
    }

    const selectedCategory = fetchedCategory?.find((category: any) => category._id === categoryId);

    console.log(selectedCategory)


    useEffect(() => {
        getAllCategories()
        fetchProduct()
    }, [])



    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!productTitle) {
                toast.error("Please enter a category title");
                setIsLoading(false)
                return;
            }
            if (!categoryId && !fetchedCategoryName) {
                toast.error("Please select a category");
                setIsLoading(false)
                return;
            }
            if (!regularPrice) {
                toast.error("Please add a regular Price");
                setIsLoading(false)
                return;
            }
            const formData = new FormData();
            formData.append("title", productTitle);
            formData.append("categoryId", categoryId || fetchedCategoryId);
            formData.append("inStock", inStock);
            formData.append("regularPrice", regularPrice);
            formData.append("categoryId", categoryId);
            formData.append("regularPrice", categoryName);
            if (salePrice) {
                formData.append("salePrice", salePrice);
            }

            const selectedCategory = fetchedCategory?.find((category: any) => category._id === categoryId);

            // Check if category is found
            if (selectedCategory) {
                // If category is found, get categoryName
                const { categoryName } = selectedCategory;
                formData.append("categoryName", categoryName);
            } else {
                // If category is not found, set categoryName as an empty string or handle it according to your requirement
                formData.append("categoryName", "");
            }


            // Make a POST request to your backend endpoint
            const res = await axios.put(`/api/product/${productId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res)
            setIsLoading(false)
            toast.success("Product updated successfully");
            router.push("/admin-panel/view-products");
        } catch (error) {
            setIsLoading(false)
            console.error("Error updating category:", error);
            toast.error("Failed to create category");
        }
    };



    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setCategoryId(newValue);
    };

    console.log(inStock)


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

            <div className="flex flex-col gap-1">
                <label htmlFor="desc" className="font-semibold">Description</label>
                <textarea value={productDesc} onChange={(e) => setProductDesc(e.target.value)} rows={6} className="bg-gray-200 px-5 py-3 rounded-2xl" id="desc" />
            </div>
            <div className="flex flex-row gap-1 w-full">
                <div className="flex flex-col w-1/2">
                    <label htmlFor="title" className="font-semibold">Regular Price</label>
                    <input type="number" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-2xl" id="title" />
                </div>
                <div className="flex flex-col w-1/2">
                    <label htmlFor="title" className="font-semibold">Sale Price(Optional)</label>
                    <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-2xl" id="title" />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="category" className="font-semibold">Category</label>
                <select onChange={handleSelectChange} id="category" className="bg-gray-200 px-5 py-3 rounded-2xl text-black">
                    {!fetchedCategoryName && <option value={fetchedCategoryId}>{fetchedCategoryName}</option>}
                    {fetchedCategory && fetchedCategory.map((category: Category) => (
                        <option key={category._id} value={category._id} selected={category._id === fetchedCategoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>



            <div className="flex flex-col gap-1">
                <label htmlFor="inStock" className="font-semibold">In Stock</label>
                <select onChange={(e) => { setInStock(e.target.value) }} id="inStock" className="bg-gray-200 px-5 py-3 rounded-2xl text-black">
                    <option value="yes" selected={inStock === 'yes'}>Yes</option>
                    <option value="no" selected={inStock === 'no'}>No</option>
                </select>
            </div>


            < div className="w-full flex items-center justify-center py-5" >
                <button onClick={handleSubmit} className=" flex items-center justify-center h-10 px-5 py-3 bg-td-secondary hover:bg-td-primary text-white rounded-2xl font-semibold w-full">
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