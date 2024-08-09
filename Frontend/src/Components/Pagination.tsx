import React, { useState } from "react";

const renderNumbering = (linesPerPage: number, dataSize: number) => {
    const pages: number[] = [];
    const totalPages = Math.ceil(dataSize / linesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return pages;
};

const Pagination: React.FC<{ dataSize: number, setCurrentPage: (page: number) => void }> = ({ dataSize, setCurrentPage }) => {
    const [currentPage, setLocalCurrentPage] = useState<number>(1);
    const linesPerPage: number = 10;
    const numbering = renderNumbering(linesPerPage, dataSize);

    const handlePageChange = (page: number) => {
        setLocalCurrentPage(page);
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="flex gap-2 mt-5 absolute">
                {numbering.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? "font-bold bg-primary-500 text-white py-2 px-4 rounded-md" : "py-2 px-4"}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
