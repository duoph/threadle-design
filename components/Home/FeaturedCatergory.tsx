"use client";

import React, { useState, useEffect } from "react";
import ProductContainerWithCategory from "../ProductContainerWithCategory";
import { Category } from "@/types";
import axios, { AxiosResponse } from "axios";

const FeaturedCategory = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const fetchCategory = async () => {
        try {
            const response: AxiosResponse<{ tdCategory: Category[] }> = await axios.get("/api/category");
            console.log(response.data.tdCategory);
            setCategories(response.data.tdCategory);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className="flex flex-col gap-3 items-center justify-center mt-10 mb-10 px-1 ">
            {categories && categories.slice(1, 4).map((category, index) => (
                <ProductContainerWithCategory setIsLoading={setIsLoading} key={index} category={category} />
            ))}
        </div>
    );
};

export default FeaturedCategory;
