import { useEffect, useState } from "react";
import SpinnerComponent from "./Spinner";
import Slider from "react-slick";

interface Data {
  id: string;
  number_rooms: number;
  number_bathrooms: number;
  all_rooms: string[];
  square_meters: number;
  description: string;
  type: string;
  image_url: string[];
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

const Details = (props: any) => {
  const API_URL: string = 'http://localhost:3000/properties';
  const setIsShowingDetails = props.setIsShowingDetailsProp;
  const propertyId = props.propertyDetailsID;
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch(API_URL + '/' + propertyId)
      .then(response => response.json())
      .then(dataJson => {
        console.log(dataJson)
        setData(dataJson);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [API_URL, propertyId]);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="bg-yellow-300 w-full">
      <button className="bg-red-300" onClick={() => setIsShowingDetails(false)}>
        Voltar
      </button>
      <section className="flex w-full">
        <article>
          
          <Slider className="w-[50%] bg-red-500" {...carouselSettings}>
            {data?.image_url.map((imageUrl: string, idx: number) => (
              <img 
                src={`http://localhost:3000${imageUrl}`} 
                alt={`image-${idx}`} 
                key={idx}
                className="w-[250px] h-[250px]"
                />
            ))}
          </Slider>

        </article>
        
        <article>
          <p>{data?.id}</p>
          <p>{data?.contact}</p>
          <p>{data?.number_bathrooms}</p>
          <p>{data?.number_rooms}</p>
          <p>$ {data?.price.toLocaleString()}</p>
          <p>{data?.square_meters} m2</p>
          <p>{data?.type}</p>
          <p>{data?.wasSold ? 'Vendido' : 'Disponível'}</p>
        </article>
      </section>
    </div>
  );
}

export default Details;
