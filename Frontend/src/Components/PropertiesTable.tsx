import { Chip } from "@nextui-org/react";
import { useState, useCallback, useMemo } from "react";
import Pagination from "./Pagination";

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
    address: Address | null; // Address can be null
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

const PropertiesTable = (props: any) => {
    const tableHeader = props.tableHeader;
    const [data, setData] = useState<Data[]>(props.data);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const setShowDetails = props.setIsShowingDetails;
    const setPropertyDetailsID = props.setPropertyDetailsID;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const linesPerPage = 10;

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            (item.address?.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) || 
             item.address?.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
             item.type.toLowerCase().includes(searchTerm.toLowerCase())) || 
             !item.address // Include items without address
        );
    }, [data, searchTerm]);

    const indexOfLastItem = currentPage * linesPerPage;
    const indexOfFirstItem = indexOfLastItem - linesPerPage;
    const currentData = useMemo(() => filteredData.slice(indexOfFirstItem, indexOfLastItem), [filteredData, indexOfFirstItem, indexOfLastItem]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleClick = (id: string) => {
        setShowDetails(true);
        setPropertyDetailsID(id);
    };

    return (
        <div className="w-[90%]">
            <span>
                <input
                    type="text"
                    placeholder="Search by neighborhood, city, or type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border rounded w-full outline-none"
                />
            </span>
            <table className="w-full table-auto border-collapse shadow-lg">
                <thead>
                    <tr className="bg-customGray-50">
                        {tableHeader.map((row: any) => (
                            <th key={row.key} className="py-2">
                                {row.value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row: Data, idx: number) => (
                        <tr
                            key={idx}
                            className={`${idx % 2 === 0 ? 'bg-tableGray-100' : 'bg-tableGray-200'} border-b-white border-b-[2px] hover:cursor-pointer hover:bg-primary-100 hover:border-b-primary-300`}
                            onClick={() => handleClick(row.id)}
                        >
                            <td className="text-center py-2">{row.address?.neighborhood ?? 'N/A'}</td>
                            <td className="text-center py-2">{row.address?.city ?? 'N/A'}</td>
                            <td className="text-center py-2">{row.type}</td>
                            <td className="text-center py-2">{row.square_meters} m²</td>
                            <td className="text-center py-2">$ {row.price.toLocaleString()}</td>
                            <td className="text-center py-2 text-xs">
                                <Chip color="success" className={`${row.wasSold ? 'bg-red-300' : 'bg-green-300'}`}>{row.wasSold ? 'Vendida' : 'Disponível'}</Chip>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <Pagination dataSize={filteredData.length} setCurrentPage={handlePageChange} />
                </tfoot>
            </table>
        </div>
    );
};

export default PropertiesTable;
