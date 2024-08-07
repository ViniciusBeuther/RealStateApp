import { Chip } from "@nextui-org/react";
import { useState } from "react";
import Pagination from "./Pagination";

interface Data{
    id: string,
    number_rooms: number,
    number_bathrooms: number,
    all_rooms: string[],
    square_meters: number,
    description: string,
    type: string,
    image_url: string,
    price: number,
    wasSold: boolean,
    contact: string,
    address: Address
}

interface Address{
    id: string,
    property_id: string,
    country: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: number,
}

const PropertiesTable = ( props:any ) => {
    const tableHeader = props.tableHeader;
    const [data, setData] = useState<Data[]>(props.data);
    const setShowDetails = props.setIsShowingDetails;
    const setPropertyDetailsID = props.setPropertyDetailsID;
    const numberPerPage:number = 10;
    const [currentPage, setCurrentPage] = useState<Number>(1);

    
    const handleClick = ( id:string ) => {
        setShowDetails(true);
        setPropertyDetailsID(id);
    }

    return(
        <table className="w-[90%] table-auto border-collapse shadow-lg"> 
                <thead>
                    <tr className="bg-customGray-50">
                        { tableHeader.map((row:any) => (
                            <th key={row.key} className="py-2"> 
                                {row.value}
                            </th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    { data.map((row:Data, idx: number) => (
                        <tr key={idx} 
                            className={`${ idx % 2 == 0 ? 'bg-tableGray-100' : 'bg-tableGray-200' } border-b-white border-b-[2px] hover:cursor-pointer hover:bg-primary-100 hover:border-b-primary-300`}
                            onClick={() => handleClick( row.id )}
                        >
                            <td className="text-center py-2">{row.address == null ? 'N/A' : row.address.neighborhood}</td>
                            <td className="text-center py-2">{row.address == null ? 'N/A' : row.address.city}</td>
                            <td className="text-center py-2">{row.type}</td>
                            <td className="text-center py-2">{row.square_meters} m2</td>
                            <td className="text-center py-2">$ {row.price.toLocaleString()}</td>
                            <td className="text-center py-2 text-xs">
                                <Chip color="success" className={`${row.wasSold ? 'bg-red-300' : 'bg-green-300'}`}>{row.wasSold ? 'Vendida' : 'Disponível'}</Chip>
                            </td>
                        </tr>
                    )) }
                </tbody>
                <tfoot>
                    <Pagination />
                </tfoot>
            </table>
    )
}

export default PropertiesTable;