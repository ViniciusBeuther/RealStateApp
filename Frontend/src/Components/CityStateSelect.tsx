import React, { useState, useEffect } from 'react';

interface State {
    ID: string;
    UF: string;
    name: string;
}

interface City {
    ID: string;
    name: string;
    state: string;
}

interface Properties {
    setStateInfo: (value: string) => void;
    setCityInfo: (value: string) => void;
}

const CityStateSelect: React.FC<Properties> = ({ setStateInfo, setCityInfo }) => {
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedState, setSelectedState] = useState<string>('');
    const [filteredCities, setFilteredCities] = useState<City[]>([]);

    useEffect(() => {
        import('./StatesData.json').then(data => setStates(data.default));
        import('./CitiesData.json').then(data => setCities(data.default));
    }, []);

    useEffect(() => {
        if (selectedState) {
            const selectedStateID = states.find(state => state.UF === selectedState)?.ID;
            setFilteredCities(cities.filter(city => city.state === selectedStateID));
        }
    }, [selectedState, states, cities]);

    const handleStateChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const stateUF = ev.target.value;
        setSelectedState(stateUF);
        setStateInfo(stateUF);
    };

    const handleCityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCityInfo(ev.target.value);
    };

    return (
        <>
            <label htmlFor="label" className="text-left w-full">Estado (UF):</label>
            <select
                name="brazilStates"
                id="brazilStates"
                className="form-control outline-none py-2 px-4 rounded-md shadow-md w-full mb-2"
                onChange={handleStateChange}
            >
                <option value="">Selecione um estado</option>
                {states.map((state) => (
                    <option key={state.ID} value={state.UF}>
                        {state.name}
                    </option>
                ))}
            </select>

            {filteredCities.length > 0 && (
                <>
                    <label htmlFor="city" className="text-left w-full mt-5">Cidade:</label>
                    <select
                        name="city"
                        id="city"
                        className="form-control outline-none py-2 px-4 rounded-md shadow-md w-full"
                        onChange={handleCityChange}
                    >
                        <option value="">Selecione uma cidade</option>
                        {filteredCities.map((city) => (
                            <option key={city.ID} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </>
    );
};

export default CityStateSelect;
