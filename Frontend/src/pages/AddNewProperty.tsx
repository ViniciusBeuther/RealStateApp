import { useState } from "react";
import FormInput from "../Components/FormInput";
import ImageUpload from "../Components/ImageUpload";

interface InputParams{
    id:string
    label: string,
    type: string,
    value: string|number,
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
}

const AddNewProperty:React.FC = () => {
    const [numberOfRooms, setNumberOfRooms] = useState<string>('');
    const [numberOfBathrooms, setNumberOfBathrooms] = useState<string>('');
    const [allRooms, setAllRooms] = useState<string>('');
    const [squareMeters, setSquareMeters] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [imagesUrl, setImagesUrl] = useState<string[]>();
    const [price, setPrice] = useState<number>(0);
    const [wasSold, setWasSold] = useState<boolean>();
    const [contact, setContact] = useState<string>('');

    
    const formInput:InputParams[] = [
            {
                id: 'numberOfRooms',
                handleChange: (ev:any) => setNumberOfRooms(ev.target.value),
                label: 'Número de Comodos do Imóvel',
                type: 'text',
                value: numberOfRooms,
                placeholder: ''
            },
            {
                id: 'numberOfBathrooms',
                handleChange: (ev:any) => setNumberOfBathrooms(ev.target.value),
                label: 'Número de Banheiros',
                type: 'text',
                value: numberOfBathrooms,
                placeholder: ''
            },
            {
                id: 'Comodos',
                handleChange: (ev:any) => setAllRooms(ev.target.value),
                label: 'Comodos do Imóvel (separado por vírgulas): ',
                type: 'text',
                value: allRooms,
                placeholder: ''
            },
            {
                id: 'squareMeters',
                handleChange: (ev:any) => setSquareMeters(ev.target.value),
                label: 'Metros quadrados (m2):',
                type: 'text',
                value: squareMeters,
                placeholder: ''
            },
            {
                id: 'description',
                handleChange: (ev:any) => setDescription(ev.target.value),
                label: 'Descrição do Imóvel:',
                type: 'text',
                value: description,
                placeholder: ''
            },
            {
                id: 'type',
                handleChange: (ev:any) => setType(ev.target.value),
                label: 'Tipo do Imóvel (1-Apartamento, 2-Casa):',
                type: 'text',
                value: type,
                placeholder: ''
            },
            {
                id: 'type',
                handleChange: (ev:any) => setPrice(ev.target.value),
                label: 'Valor do Imóvel',
                type: 'number',
                value: price,
                placeholder: ''
            },
            {
                id: 'contact',
                handleChange: (ev:any) => setPrice(ev.target.value),
                label: 'Contato (e-mail / telefone): ',
                type: 'text',
                value: contact,
                placeholder: ''
            },
    ]
    
    return(
        <section className="w-full h-full rounded-xl bg-violet-400 flex">
            <article className="w-full h-full bg-green-200">
                <h1 className="text-2xl font-bold">Preencha os Dados da Propriedade</h1>
                { formInput.map((element) => (
                    <FormInput
                        handleChange={element.handleChange}
                        label={element.label}
                        type={element.type}
                        value={element.value}
                        placeholder={element.placeholder}
                    />
                )) }
                <div className="flex items-start justify-center">

                </div>
                <button>
                    Adicionar
                </button>
            </article>
            <article className="w-full h-full bg-red-200">
                Side 02
                <ImageUpload />
            </article>
        </section>
    )
}

export default AddNewProperty;