import { useEffect, useState } from "react"
import SpinnerComponent from "../Components/Spinner";
import { Chip } from "@nextui-org/react";
import PropertiesTable from "../Components/PropertiesTable";

interface HeaderList{
    key: number, 
    value: string
}

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

const Properties:React.FC = () => {
    const API_URL:string = 'http://localhost:5000/properties';
    const tableHeader:HeaderList[] = [
        {
            key:1,
            value: 'Bairro'
        },
        {
            key:2,
            value: 'Cidade'
        },
        {
            key:3,
            value: 'Tipo'
        },
        {
            key:4,
            value: 'Área'
        },
        {
            key:5,
            value: 'Preço'
        },
        {
            key:6,
            value: 'Status'
        },
    ]
    const [data, setData] = useState<Data[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowingDetails, setIsShowingDetails] = useState(false);
    const [propertyDetailsID, setPropertyDetailsID] = useState('');

    useEffect(() => {    
        fetch( API_URL )
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            setData(data);
            setIsLoading(true);
        })
        .catch(err => console.log(err))
        
    }, [])

    if(!isLoading){
        return <SpinnerComponent />
    }

    return(
        <section className="w-full h-full PropertiesBackgroundPattern flex items-start justify-center pt-5">
            { isShowingDetails ? (
                <div><button>voltar</button></div>
                
            ) : <PropertiesTable data={data} tableHeader={tableHeader} setIsShowingDetails={setIsShowingDetails} setPropertyDetailsID={setPropertyDetailsID} /> }
        </section>
    )
}

export default Properties;

/*
    <table className="w-full">
      <thead>
        <tr className="bg-customWhite-100">
          {columns.map((column) => (
            <th key={column.key} className="border border-black p-2 text-center">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={row.key} className={`hover:bg-gray-100 hover:cursor-pointer ${idx % 2 == 0 ? 'bg-primary-300' : 'bg-primary-200'}`}>
            <td className="border border-black p-2 text-center">{row.name}</td>
            <td className="border border-black p-2 text-center">{row.role}</td>
            <td className="border border-black p-2 text-center">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
*/