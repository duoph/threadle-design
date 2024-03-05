"use client";

import React, { useState, useEffect } from "react";
import ProductContainerWithCategory from "../ProductContainerWithCategory";
import { Category } from "@/types";
import axios, { AxiosResponse } from "axios";

const FeaturedCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]); // Initialize with an empty array of categories

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
        <div className="flex flex-col gap-3 items-center justify-center mt-10 mb-10">
            {categories && categories.map((category, index) => (
                <ProductContainerWithCategory key={index} category={category} />
            ))}
        </div>
    );
};

export default FeaturedCategory;
