import { useEffect, useState } from "react";
import DashboardChart from "../Components/DashboardChart";
import DashboardTable from "../Components/DashboardTable";
import SpinnerComponent from "../Components/Spinner";

interface Data{
    id: string,
    number_rooms: number,
    number_bathrooms: number,
    all_rooms: string,
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

const Dashboard:React.FC = () => {
    const API_URL = 'http://localhost:3000/properties';
    const [data, setData] = useState<Data[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [propertiesSold, setPropertiesSold] = useState<String>('0');
    const [billing, setBilling] = useState<String>('0');
    const [propertiesAvailable, setPropertiesAvailable] = useState<String>('0');


    // Function to calculate how many properties were sold
    function calculatePropertiesSold( data:Data[] ){
        const soldProperties:Data[] = data.filter((record) => record.wasSold === true);
        calculateBilling(soldProperties);

        return setPropertiesSold(soldProperties.length.toString());
    }

    // Function to calculate the total amount billed for the properties sold
    // ** Is called by the function above (calculatePropertiesSold) **  
    function calculateBilling( data:Data[] ){
        const amount = data.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
        const formatter = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return setBilling((formatter.format(amount)));
    }

    function calculatePropertiesAvailable( data:Data[] ){
        const propertiesAvailable: Data[] = data.filter((property) => property.wasSold === false);
        return setPropertiesAvailable(propertiesAvailable.length.toString());
    }

    
    // Fetch data from database
    useEffect(() => {    
        fetch( API_URL )
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            setData(data);
            setIsLoading(true);
            calculatePropertiesSold(data);
            calculatePropertiesAvailable( data );
        })
        .catch(err => console.log(err))
        
    }, [])

    if(!isLoading){
        return <SpinnerComponent />
    }

    return(
        <section className="DashboardBackgroundPattern w-full h-full rounded-xl p-5">
            <article className="DashboardGridParent">
                <div className="DashboardChildren01 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>{propertiesSold}</h1>
                    <p>Propriedades Vendidas</p>
                </div>
                <div className="DashboardChildren02 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>{billing}</h1>
                    <p>Faturados</p>
                </div>
                <div className="DashboardChildren03 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>{propertiesAvailable}</h1>
                    <p>Imóveis Disponíveis</p>
                </div>
                <div className="DashboardChildren04 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>12</h1>
                    <p>Clientes</p>
                </div>
                <div className="DashboardChildren05 DashboardTableParent">
                    <DashboardTable />
                </div>
                <div className="DashboardChildren06 DashboardChartParent flex items-center flex-col justify-start gap-2 shadow-lg text-white">
                    <h1>Imóveis Vendidos durante o Ano</h1>
                    <DashboardChart />
                </div>
            </article>
        </section>
    )
}

export default Dashboard;