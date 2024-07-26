import React, { ChangeEvent } from "react";

interface Props{
    label: string,
    type: string,
    value: string|number|undefined,
    handleChange: (ev: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
}

const FormInput: React.FC<Props> = ( { label, type, value, handleChange, placeholder } ) => {
    return(
        <article className="flex flex-col items-center justify-center mt-2">
            <label htmlFor="label" className="text-left w-full">{label}</label>
            <input type={type} value={value} onChange={handleChange} placeholder={placeholder}
                className="outline-none py-2 px-4 rounded-md shadow-md w-full"
            />
        </article>
    )
};

export default FormInput;
