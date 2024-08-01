import { ChangeEvent, useState } from "react";
import FormInput from "../Components/FormInput";
import { v4 as uuidv4 } from "uuid";
import CountriesDropdown from "../Components/CoutriesDropdown";
import CityStateSelect from "../Components/CityStateSelect";

interface Data {
  id: string;
  number_rooms: number;
  number_bathrooms: number;
  all_rooms: string;
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

interface InputParams {
  id: string;
  label: string;
  type: string;
  value: string | number;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const AddNewProperty: React.FC = () => {
  const [numberOfRooms, setNumberOfRooms] = useState<string>("");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState<string>("");
  const [allRooms, setAllRooms] = useState<string>("");
  const [squareMeters, setSquareMeters] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [typeProp, setTypeProp] = useState<string>("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [wasSold, setWasSold] = useState<boolean>(false);
  const [contact, setContact] = useState<string>("");
  const [propertyId, setPropertyId] = useState<string>(uuidv4());
  const [image, setImage] = useState<FileList | null>(null);
  const [country, setCountry] = useState<string>('Brasil');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<number>();
  const [error, setError] = useState<string>("");

  const addressInputs: InputParams[] = [
    {
      id: "neighborhood",
      label: "Bairro: ",
      type: "text",
      value: neighborhood,
      handleChange: (ev: any) => setNeighborhood(ev.target.value),
      placeholder: "",
    },
    {
      id: "street",
      label: "Rua: ",
      type: "text",
      value: street,
      handleChange: (ev: any) => setStreet(ev.target.value),
      placeholder: "",
    },
    {
      id: "number",
      label: "Número do Imóvel: ",
      type: "text",
      value: number || 0,
      handleChange: (ev: any) => setNumber(ev.target.value),
      placeholder: "",
    },
  ];

  const formInput: InputParams[] = [
    {
      id: "numberOfRooms",
      handleChange: (ev: any) => setNumberOfRooms(ev.target.value),
      label: "Número de Comodos do Imóvel",
      type: "text",
      value: numberOfRooms,
      placeholder: "",
    },
    {
      id: "numberOfBathrooms",
      handleChange: (ev: any) => setNumberOfBathrooms(ev.target.value),
      label: "Número de Banheiros",
      type: "text",
      value: numberOfBathrooms,
      placeholder: "",
    },
    {
      id: "Comodos",
      handleChange: (ev: any) => setAllRooms(ev.target.value),
      label: "Comodos do Imóvel (separado por vírgulas): ",
      type: "text",
      value: allRooms,
      placeholder: "",
    },
    {
      id: "squareMeters",
      handleChange: (ev: any) => setSquareMeters(ev.target.value),
      label: "Metros quadrados (m2):",
      type: "text",
      value: squareMeters,
      placeholder: "",
    },
    {
      id: "description",
      handleChange: (ev: any) => setDescription(ev.target.value),
      label: "Descrição do Imóvel:",
      type: "textarea",
      value: description,
      placeholder: "",
    },
    {
      id: "type",
      handleChange: (ev: any) => setTypeProp(ev.target.value),
      label: "Tipo do Imóvel (1-Apartamento, 2-Casa):",
      type: "text",
      value: typeProp,
      placeholder: "",
    },
    {
      id: "price",
      handleChange: (ev: any) => setPrice(Number(ev.target.value)),
      label: "Valor do Imóvel",
      type: "number",
      value: price,
      placeholder: "",
    },
    {
      id: "contact",
      handleChange: (ev: any) => setContact(ev.target.value),
      label: "Contato (e-mail / telefone): ",
      type: "text",
      value: contact,
      placeholder: "",
    },
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const clearInputFields = () => {
    setNumberOfRooms("");
    setNumberOfBathrooms("");
    setAllRooms("");
    setSquareMeters("");
    setDescription("");
    setTypeProp("");
    setPrice(0);
    setWasSold(false);
    setContact("");
    setImagesUrl([]);
    setImage(null);
    setError("");
  };

  const checkPropertyType = (type: string) => {
    return type === "1" ? "Apartamento" : type === "2" ? "Casa" : "Error";
  };

  // Function to upload the images for the backend thru HTTP request (POST)
  const handleUpload = async () => {
    if (!image) {
      setError("Selecione uma imagem");
      return;
    }

    const formData = new FormData();

    Array.from(image).forEach((img) => {
      formData.append('images', img);
    });

    formData.append("propertyId", propertyId);

    try {
      const response = await fetch(
        `http://localhost:3000/properties/upload/${propertyId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao enviar imagem');
      }

      const result = await response.json();
      const filePaths = result.filePaths;
      setImagesUrl(filePaths);

    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setError('Erro ao enviar imagem');
    }
  };

  const insertAddress = async (propertyId: string) => {
    const address = {
      id: uuidv4(),
      property_id: propertyId,
      country: 'Brasil',
      state: state,
      city: city,
      neighborhood: neighborhood,
      street: street,
      number: number || 0,
    };

    try {
      const response = await fetch('http://localhost:3000/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao inserir endereço no banco');
      }
    } catch (error) {
      console.error('Erro inserindo endereço:', error);
    }
  };

  // Function to submit the form
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    await handleUpload();
    
    if (imagesUrl.length !== 0) {
      const dataToInsert: Data = {
        id: propertyId,
        number_bathrooms: parseInt(numberOfBathrooms),
        number_rooms: parseInt(numberOfRooms),
        all_rooms: allRooms,
        contact: contact,
        description: description,
        image_url: imagesUrl,
        price: price,
        type: checkPropertyType(typeProp),
        square_meters: parseFloat(squareMeters),
        wasSold: wasSold,
        address: {
          id: uuidv4(),
          property_id: propertyId,
          country: 'Brasil',
          state: state,
          city: city,
          neighborhood: neighborhood,
          street: street,
          number: number || 0,
        }
      };

      try {
        const response = await fetch('http://localhost:3000/properties/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToInsert),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Erro ao inserir dados no banco');
        }

        await insertAddress(propertyId);
        clearInputFields();
      } catch (error: any) {
        console.error('Erro inserindo dados:', error);
      }
    }
  };

  return (
    <section className="w-full h-full rounded-xl AddPropertyBackgroundPattern flex">
      <article className="w-full flex flex-col items-center justify-start mt-5">
        <form onSubmit={handleSubmit} name="images" className="AddPropertyForm py-6 px-12">
          <h1 className="text-3xl font-extrabold text-primary-900">Preencha os Dados da Propriedade</h1>
          {formInput.map((element, idx) => (
            <FormInput
              handleChange={element.handleChange}
              label={element.label}
              type={element.type}
              value={element.value}
              placeholder={element.placeholder}
              key={idx}
            />
          ))}

          <div className="my-5">
            <h2>Selecione as imagens da propriedade</h2>
            <div className="">
              <input id="FormInputFile" type="file" onChange={handleFileChange} multiple />
            </div>
            {error && (
              <div style={{ color: "red" }}>
                <p>{error}</p>
              </div>
            )}
          </div>

          <button type="submit" className="bg-primary-400 text-white rounded-md py-2 px-5 shadow-lg hover:bg-primary-500">Adicionar imóvel</button>
        </form>
      </article>
      <article className="w-full">
        <CountriesDropdown stateControl={setCountry} />
        <CityStateSelect setStateInfo={setState} setCityInfo={setCity} />
        {addressInputs.map((element, idx) => (
          <FormInput
            handleChange={element.handleChange}
            label={element.label}
            type={element.type}
            value={element.value}
            placeholder={element.placeholder}
            key={idx}
          />
        ))}
      </article>
    </section>
  );
};

export default AddNewProperty;
