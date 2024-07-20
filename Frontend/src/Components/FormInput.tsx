import React, { ChangeEvent } from "react";

interface Props{
    label: string,
    type: string,
    value: string|number|string[]|undefined,
    handleChange: (ev: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
}

const FormInput: React.FC<Props> = ( { label, type, value, handleChange, placeholder } ) => {
    return(
        <article className="flex flex-col items-center justify-center">
            <label htmlFor="label" className="text-left w-[75%]">{label}</label>
            <input type={type} value={value} onChange={handleChange} placeholder={placeholder}
                className="outline-none py-1 px-2 rounded-md shadow-md w-[75%]"
            />
        </article>
    )
};

export default FormInput;
