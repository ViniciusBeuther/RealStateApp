import React, { useState } from "react";

interface Data {
    id: string;
    number_rooms: number;
    number_bathrooms: number;
    all_rooms: string[];
    square_meters: number;
    description: string;
    type: string;
    image_url: string;
    price: number;
    wasSold: boolean;
    contact: string;
    address: Address;
}

interface Address {
    id: string;
    property_id: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
}

const renderNumbering = (linesPerPage: number, dataSize: number) => {
    const pages: number[] = [];
    const totalPages = Math.ceil(dataSize / linesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return pages;
};

const Pagination: React.FC<{ data: Data[], setCurrentData:any }> = ({ data, setCurrentData }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const linesPerPage: number = 10;
    const dataSize = data.length;
    const numbering = renderNumbering(linesPerPage, dataSize);

    
    const indexOfLastItem = currentPage * linesPerPage;
    const indexOfFirstItem = indexOfLastItem - linesPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    
    return (
        <div>
            <div className="flex gap-2">
                {numbering.map((number) => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? "font-bold" : ""}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
