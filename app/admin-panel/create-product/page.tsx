'use client';

import { useRouter } from "next/navigation";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { Category } from "@/types";


const CreateProduct = () => {
    const router = useRouter();

    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [isCustom, setIsCustom] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState<string>("")
    const [regularPrice, setRegularPrice] = useState<string>("")
    const [salePrice, setSalePrice] = useState<string>("")
    const [tags, setTags] = useState<string>("")
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [image1, setImage1] = useState<string | null>("");
    const [image2, setImage2] = useState<string | null>("");
    const [image3, setImage3] = useState<string | null>("");
    const [image4, setImage4] = useState<string | null>("");
    const [image5, setImage5] = useState<string | null>("");
    const [image6, setImage6] = useState<string | null>("");
    const [image7, setImage7] = useState<string | null>("");
    const [image8, setImage8] = useState<string | null>("");
    const [image9, setImage9] = useState<string | null>("");
    const [image10, setImage10] = useState<string | null>("");

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [moreImages, setMoreImages] = useState([]);
    const [inStock, setInStock] = useState("yes");
    const [isFeatured, setIsFeatured] = useState("");

    const [hexCode, setHexCode] = useState("")
    const [colorCodes, setColorCodes] = useState<string[]>([]);

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


    const handleColorCode = () => {
        try {
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (hexRegex.test(hexCode)) {
                if (colorCodes.includes(hexCode)) {
                    toast.error("Color already exists");
                } else {
                    toast.success("Color Added");
                    setColorCodes(prevColorCodes => [...prevColorCodes, hexCode]);
                    setHexCode("");
                }
            } else {
                toast.error("Invalid hex code");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleRemoveColor = (color: string) => {
        try {
            const updatedColorCodes = colorCodes.filter(c => c !== color);
            setColorCodes(updatedColorCodes);
            toast.success("Color Removed");
        } catch (error) {
            console.error("Error removing color:", error);
            toast.error("Failed to remove color. Please try again.");
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
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 2:
                    setImage2(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 3:
                    setImage3(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 4:
                    setImage4(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 5:
                    setImage5(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 6:
                    setImage6(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 7:
                    setImage7(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 8:
                    setImage8(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 9:
                    setImage9(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                case 10:
                    setImage10(imageUrl);
                    setMoreImages((prev) => ({ ...prev, imageUrl }));
                    break;
                default:
                    break;
            }
        }
    };
    console.log(moreImages)

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setCategoryId(newValue);

    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();




            if (!title || !desc || !coverImage || isCustom === false && !regularPrice) {


                if (isCustom === false && !regularPrice) {
                    return toast.error("Add price");
                }

                if (!desc) {
                    return toast.error("Add a description");
                }

                if (!coverImage) {
                    return toast.error("Add Cover Image");
                }

                return toast.error("Some fields are missig");
            }


            setIsLoading(true)
            const formData = new FormData();


            formData.append("title", title);
            formData.append("categoryId", categoryId);
            formData.append("desc", desc);
            formData.append("regularPrice", regularPrice);
            formData.append("isCustom", isCustom ? "true" : "false");
            formData.append("tags", tags);
            formData.append("inStock", inStock);
            formData.append("isFeatured", isFeatured);

            if (colorCodes) {
                const colorCodesString = colorCodes.join(',');
                formData.append("colorCodes", colorCodesString);
            }

            const selectedCategory = fetchedCategory?.find((category: any) => category._id === categoryId);

            if (selectedCategory) {
                const { categoryName } = selectedCategory;
                formData.append("categoryName", categoryName);
            } else {
                formData.append("categoryName", "");
            }


            if (salePrice) {
                formData.append("salePrice", salePrice);
            }

            const imageFields = ["coverImage", "image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10"];

            for (const fieldName of imageFields) {
                const imageUrl = (fieldName === "coverImage") ? coverImage : (fieldName === "image1") ? image1 : (fieldName === "image2") ? image2 : (fieldName === "image3") ? image3 : (fieldName === "image4") ? image4 : (fieldName === "image5") ? image5 : (fieldName === "image6") ? image6 : (fieldName === "image7") ? image7 : (fieldName === "image8") ? image8 : (fieldName === "image9") ? image9 : image10;

                if (imageUrl) {
                    const imageFile = await fetch(imageUrl).then((res) => res.blob());
                    formData.append(fieldName, imageFile);
                }
            }


            const res = await axios.post('/api/product', formData);

            console.log(res)

            if (res.data.success === true) {
                setIsLoading(false)
                toast.success('Product created successfully!');
                router.push(`/admin-panel/view-products`);
            }

            if (res.data.success === false) {
                setIsLoading(false)
                toast.success('Failed to create your product');
            }


        } catch (error) {
            console.log(error)
            console.error("Error creating product:", error);
            toast.error('Failed to create product. Please try again.');
        }
    };


    useEffect(() => {
        getAllCategories()
    }, [])

    console.log(colorCodes)



    return (

        <div className='flex flex-col gap-3 py-5 md:px-10 px-5 w-full'>
            <div className='flex gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={20} />
                <h1 className='text-center text-[25px] md:text-[35px] font-bold text-3xl'>Create new Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-md" type="text" id="title" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="desc" className="font-semibold">Description</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={6} className="bg-gray-200 px-5 py-3 rounded-md" id="desc" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="font-semibold">Category</label>

                    <select onChange={handleSelectChange} id="category" className="bg-gray-200 px-5 py-3 rounded-md text-black">
                        <option className="px-5 py-3 " value={"default"}>Select category</option>
                        {fetchedCategory && fetchedCategory.map((category: Category, i) => (
                            <option key={i} value={category._id}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>


                {/* color code */}

                <div className="flex flex-col gap-1">
                    <label htmlFor="color" className="font-semibold">Color (enter color code )</label>
                    <div className="w-full flex bg-gray-200 rounded-md items-center justify-center">
                        <input value={hexCode} onChange={(e) => setHexCode(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-l-2xl w-full" type="text" id="color" placeholder="eg:#495D69" />
                        <span onClick={handleColorCode} className="bg-td-secondary cursor-pointer px-5 py-3 rounded-md text-white">Add</span>
                    </div>
                </div>

                {colorCodes && (
                    <div className="flex flex-wrap items-center gap-3 bg-gray-200 px-4 py-3 rounded-md w-full">
                        <h1>Selected Colors :</h1>
                        {colorCodes.map((color, i) =>
                        (
                            <span onClick={() => handleRemoveColor(color)} key={i} style={{ background: color }} className={`relative cursor-pointer h-[35px] w-[35px] rounded-[50%] flex items-center justify-center shadow-lg`}>
                                {/* <IoMdClose size={20} /> */}
                            </span>
                        ))}

                    </div>
                )}


                <h1 className="font-semibold">Pricing</h1>

                <div className="flex flex-row items-center justify-start gap-3">
                    <label htmlFor="isCustom" className="font-medium">Product has custom pricing</label>
                    <input
                        type="checkbox"
                        id="isCustom"
                        checked={isCustom}
                        onChange={(e) => setIsCustom(!isCustom)}
                    />

                </div>

                {
                    !isCustom && (
                        <div className="flex flex-row gap-1 w-full">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="title" className="font-medium">Regular Price</label>
                                <input value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-md" id="title" />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="title" className="font-medium">Offer Price</label>
                                <input value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-md" id="title" />
                            </div>
                        </div>
                    )
                }

                <div className="flex flex-col gap-1">
                    <label htmlFor="inStock" className="font-semibold">In Stock</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="inStock"
                            checked={inStock === 'yes'}
                            onChange={(e) => {
                                setInStock(e.target.checked ? 'yes' : 'no')
                            }}
                            className="mr-2"
                        />
                        <label htmlFor="inStock">Yes</label>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="isFeatured" className="font-semibold">Display on featured</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={isFeatured === 'yes'}
                            onChange={(e) => {
                                setIsFeatured(e.target.checked ? 'yes' : 'no')
                            }}
                            className="mr-2"
                        />
                        <label htmlFor="isFeatured">Yes</label>
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="tags" className="font-semibold">Tags</label>
                    <input value={tags} onChange={(e) => setTags(e.target.value)} className="bg-gray-200 px-5 py-3 rounded-md" type="text" id="tags" />
                </div>


                <h1 className="text-[15px] font-semibold">Cover Image</h1>
                <div className="flex flex-col gap-2 items-center justify-center ">
                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!coverImage && (
                            <label htmlFor="coverImage" className="font-semibold w-full h-full flex flex-col items-center justify-center">
                                <CiSquarePlus size={20} />
                                <span className="text-sm text-gray-500">Cover</span>
                            </label>
                        )}
                        {coverImage && (
                            <Image className="rounded-md -z-10" src={coverImage} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="coverImage" onChange={(e) => handleDisplayImage(e, 0)} />
                        {coverImage && (
                            <MdDelete onClick={() => setCoverImage("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3" size={20} />
                        )}
                    </div>

                </div>


                <h1 className="text-[15px] font-semibold">More Images</h1>
                <div className="flex md:flex-row flex-row flex-wrap items-center justify-center gap-2">
                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image1 && (
                            <label htmlFor="image1" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image1 && (
                            <Image className="rounded-md" src={image1} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image1" onChange={(e) => handleDisplayImage(e, 1)} />
                        {image1 && (
                            <MdDelete onClick={() => setImage1("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    {/* {image1 && ( */}
                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md ">
                        {!image2 && (
                            <label htmlFor="image2" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />
                                <span className="text-sm text-gray-500"></span>
                            </label>
                        )}
                        {image2 && (
                            <Image className="rounded-md" src={image2} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image2" onChange={(e) => handleDisplayImage(e, 2)} />
                        {image2 && (
                            <MdDelete onClick={() => setImage2("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image3 && (
                            <label htmlFor="image3" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image3 && (
                            <Image className="rounded-md" src={image3} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image3" onChange={(e) => handleDisplayImage(e, 3)} />
                        {image3 && (
                            <MdDelete onClick={() => setImage3("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image4 && (
                            <label htmlFor="image4" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer ">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image4 && (
                            <Image className="rounded-md" src={image4} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image4" onChange={(e) => handleDisplayImage(e, 4)} />
                        {image4 && (
                            <MdDelete onClick={() => setImage4("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image5 && (
                            <label htmlFor="image5" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image5 && (
                            <Image className="rounded-md" src={image5} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image5" onChange={(e) => handleDisplayImage(e, 5)} />
                        {image5 && (
                            <MdDelete onClick={() => setImage5("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image6 && (
                            <label htmlFor="image6" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image6 && (
                            <Image className="rounded-md" src={image6} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image6" onChange={(e) => handleDisplayImage(e, 6)} />
                        {image6 && (
                            <MdDelete onClick={() => setImage6("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>
                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image7 && (
                            <label htmlFor="image7" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image7 && (
                            <Image className="rounded-md" src={image7} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image7" onChange={(e) => handleDisplayImage(e, 7)} />
                        {image7 && (
                            <MdDelete onClick={() => setImage7("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image8 && (
                            <label htmlFor="image8" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image8 && (
                            <Image className="rounded-md" src={image8} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image8" onChange={(e) => handleDisplayImage(e, 8)} />
                        {image8 && (
                            <MdDelete onClick={() => setImage8("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image9 && (
                            <label htmlFor="image9" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image9 && (
                            <Image className="rounded-md" src={image9} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image9" onChange={(e) => handleDisplayImage(e, 9)} />
                        {image9 && (
                            <MdDelete onClick={() => setImage9("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                        {!image10 && (
                            <label htmlFor="image10" className="font-semibold w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CiSquarePlus size={20} />

                            </label>
                        )}
                        {image10 && (
                            <Image className="rounded-md" src={image10} alt="Image" fill={true} />
                        )}
                        <input type="file" accept="image/*" className="hidden" id="image10" onChange={(e) => handleDisplayImage(e, 10)} />
                        {image10 && (
                            <MdDelete onClick={() => setImage10("")} className="bg-red-500 rounded-md z-10 text-white cursor-pointer absolute bottom-3 " size={20} />
                        )}
                    </div>

                </div>
                <div className="flex items-center justify-center flex-col py-5">
                    <button disabled={isLoading} type="submit" className=" flex items-center justify-center h-10 px-5 py-3 bg-td-secondary text-white rounded-md font-semibold sm:w-[200px] w-full">
                        {isLoading && (
                            <PulseLoader color="white" className="text-white" />
                        )}
                        {!isLoading && (
                            <span className="text-[15px] w-full">Create Product</span>
                        )}
                    </button>
                </div>

            </form >
        </div >

    );
}

export default CreateProduct;