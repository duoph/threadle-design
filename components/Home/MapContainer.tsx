"use client"

import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// const libraries: string[] = ['places'];

const mapContainerStyle = {
    height: '50vh',
};
const center = {
    lat: 7.2905715,
    lng: 80.6337262,
};

const MapContainer = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'erewrwear',
        libraries: [],
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return (
            <div className=' lg:px-10 px-5 mt-5 lg:mt-10 mb-10 flex flex-col gap-2 items-center justify-center'>
                <div>
                    Loading
                </div>
            </div>
        )
    }

    return (

        <div className=' lg:px-10 px-5 mt-5 lg:mt-10 mb-10 flex flex-col gap-2 items-center justify-center'>
            <h1 className='lg:text-[40px] text-[25px] font-bold text-td-secondary'>Locate Our Store</h1>
            <div className='w-full h-full'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={center}
                >
                    <Marker position={center} />
                </GoogleMap>
            </div>

        </div>
    );
};

export default MapContainer;