interface HeaderList{
    key: number, 
    value: string
}

const Properties:React.FC = () => {
    const tableHeader:HeaderList[] = [
        {
            key:1,
            value: 'ID'
        },
        {
            key:2,
            value: 'Localização'
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
            value: 'Vendida'
        },
    ]

    return(
        <section className="w-full h-full PropertiesBackgroundPattern flex items-start justify-center">
            <table className="w-[90%] table-auto border-collapse"> 
                <thead>
                    <tr className="bg-red-500">
                        { tableHeader.map((row) => (
                            <th key={row.key}>
                                {row.value}
                            </th>
                        )) }
                    </tr>
                </thead>
            </table>
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