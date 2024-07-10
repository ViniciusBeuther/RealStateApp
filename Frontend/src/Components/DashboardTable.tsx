import React from "react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

const DashboardTable: React.FC = () => {
  return (
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
  );
};

export default DashboardTable;