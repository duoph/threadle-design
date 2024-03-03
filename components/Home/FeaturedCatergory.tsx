"use client";

import React, { useState, useEffect } from "react";
import ProductContainerWithCategory from "../ProductContainerWithCategory";
import { Category, Product } from "@/types";
import axios from "axios";

const FeaturedCategory = () => {
    const [categories, setCategories] = useState<Category>();

    const fetchCategory = async () => {
        try {
            const response = await axios.get("/api/category");
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
            {categories?.map((category, index) => (
                <ProductContainerWithCategory key={index} category={category} />
            ))}
        </div>
    );
};

export default FeaturedCategory;