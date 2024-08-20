import { useEffect, useState } from "react";
import SpinnerComponent from "./Spinner";


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
  const [currentImage, setCurrentImage] = useState(0);

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

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % (data?.image_url.length || 1));
  };

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? (data?.image_url.length || 1) - 1 : prev - 1
    );
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="w-full">
      <button className="bg-red-300" onClick={() => setIsShowingDetails(false)}>
        Voltar
      </button>
      <section className="p-4 flex justify-center gap-10">
        <div className="relative max-w-lg overflow-hidden">
          <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {data?.image_url.map((imageUrl: string, idx: number) => (
              <div key={idx} className="min-w-full">
                <img
                  src={`http://localhost:3000${imageUrl}`}
                  alt={`image-${idx}`}
                  className="w-full h-full object-cover"
                  />
              </div>
            ))}
          </div>

          <button onClick={handlePrev} className="absolute top-1/2 left-0 mr-5 transform -translate-y-1/2 bg-primary-500 bg-opacity-50 text-white px-3 py-2 rounded-r-lg">
            ←
          </button>
          <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary-500 bg-opacity-50 text-white px-3 py-2 rounded-l-lg">
          → 
          </button>
        </div>
        <div className="bg-white rounded-md p-5">
            <article>
              <h1 className="text-lg font-bold">Descrição</h1>
              <p>{data?.description}</p>
            </article>
            <article className="bg-pink-400">
              <p><strong>ID:</strong> {data?.id}</p>
              <p><strong>Contato:</strong> {data?.contact}</p>
              <p><strong>Banheiros:</strong> {data?.number_bathrooms}</p>
              <p><strong>Quartos:</strong> {data?.number_rooms}</p>
              <p><strong>Preço:</strong> $ {data?.price.toLocaleString()}</p>
              <p><strong>Metragem:</strong> {data?.square_meters} m2</p>
              <p><strong>Tipo:</strong> {data?.type}</p>
              <p><strong>Status:</strong> {data?.wasSold ? 'Vendido' : 'Disponível'}</p>
            </article>
        </div>
      </section>
    </div>
  );
}

export default Details;
