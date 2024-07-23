import { ChangeEvent, useEffect, useState } from "react";
import FormInput from "../Components/FormInput";
import ImageUpload from "../Components/ImageUpload";
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

interface Data {
  id: string;
  number_rooms: number;
  number_bathrooms: number;
  all_rooms: string;
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
  const [imagesUrl, setImagesUrl] = useState<string[]>();
  const [price, setPrice] = useState<number>(0);
  const [wasSold, setWasSold] = useState<boolean>();
  const [contact, setContact] = useState<string>("");
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
      id: "type",
      handleChange: (ev: any) => setPrice(ev.target.value),
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
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string>("");
  const [error, setError] = useState<string>("");
  const rootImageFolder =
    "C:\\Users\\vinic\\OneDrive\\Área de Trabalho\\OneBitCode\\Portfolio\\Fullstack\\RealStateApp\\Backend\\uploads";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const clearInputFields = () => {
    setNumberOfBathrooms("");
    setNumberOfBathrooms("");
    setAllRooms("");
    setSquareMeters("");
    setDescription("");
    setTypeProp("");
    setPrice(0);
    setWasSold(false);
    setContact("");

    setImage(null);
    setError("");
  };

  // Function used to check the type of the property (house or apartment)
  const checkPropertyType = (type: string) => {
    let tempVar: string = "";

    if (type == "1") {
      return (tempVar = "Casa");
    } else if (type == "2") {
      return (tempVar = "Apartamento");
    } else {
      return (tempVar = "Error");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Selecione uma imagem");
      return;
    }
    const propertyId = uuidv4();
    const formData = new FormData();

    formData.append("image", image);
    formData.append("propertyId", propertyId);

    try {
      const response = await fetch(
        `http://localhost:8000/properties/upload/${propertyId}`,
        {
          method: "POST",
          body: formData,
        }
      ); 

      const data = await response.json();
      const imagesDirectory = rootImageFolder + '/' + propertyId;
      const filesInsideOfImgFolder = fs.readdirSync(imagesDirectory);
      setImagesUrl(filesInsideOfImgFolder);

      setUploadedImagePath(data.imagePath);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setError("Erro ao enviar imagem. Verifique o console para mais detalhes.");
    }
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const propertyId = uuidv4();
    
    console.log("submitted");

    const tempType = checkPropertyType(typeProp);

    const objToInsertInDB: Data = {
      id: propertyId,
      number_rooms: parseInt(numberOfRooms),
      number_bathrooms: parseInt(numberOfBathrooms),
      all_rooms: allRooms,
      square_meters: parseFloat(squareMeters),
      description: description,
      type: tempType,
      image_url: uploadedImagePath,
      price: price,
      wasSold: Boolean(wasSold),
      contact: contact,
      address: {
        city: "SBS",
        country: "Brazil",
        id: uuidv4(),
        neighborhood: "Cruzeiro",
        number: 1,
        property_id: propertyId,
        state: "Santa Catarina",
        street: "Rua do Bar",
      },
    };
    console.log(objToInsertInDB);

    try {
      const response = await fetch("http://localhost:8000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objToInsertInDB),
      });

      if (response.ok) {
        console.log("Propriedade adicionada com sucesso");
        clearInputFields();
      } else {
        console.error("Erro ao adicionar propriedade");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };
  return (
    <section className="w-full h-full rounded-xl bg-violet-400 flex">
      <article className="w-full h-full bg-green-200">
        <h1 className="text-2xl font-bold">Preencha os Dados da Propriedade</h1>

        <form onSubmit={handleSubmit}>
          {formInput.map((element) => (
            <FormInput
              handleChange={element.handleChange}
              label={element.label}
              type={element.type}
              value={element.value}
              placeholder={element.placeholder}
            />
          ))}

          <div>
            <h2>Upload de Imagem</h2>
            <div>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div>
              <button onClick={handleUpload}>Enviar Imagem</button>
            </div>
            {uploadedImagePath && (
              <div>
                <h3>Imagem Enviada:</h3>
                <img
                  src={`http://localhost:5000${uploadedImagePath}`}
                  alt="Imagem Enviada"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            {error && (
              <div style={{ color: "red" }}>
                <p>{error}</p>
              </div>
            )}
          </div>

          <button type="submit">Enviar</button>
        </form>
      </article>
      <article className="w-full h-full bg-red-200">Side 02</article>
    </section>
  );
};

export default AddNewProperty;
