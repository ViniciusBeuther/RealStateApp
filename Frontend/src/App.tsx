import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import dashboardIcon from '../public/icons/dashboard-icon.svg'
import propertyIcon from '../public/icons/property-icon.svg'
import soldIcon from '../public/icons/sold-icon.svg'
import logo from '../public/icons/logo.svg'
import Properties from "./pages/Properties";
import Sold from "./pages/Sold";


const App: React.FC = () => {
  const sideBar = [
    {
      key: "Dashboard",
      value: <Dashboard />,
      icon: dashboardIcon,
    },
    {
      key: "Imóveis",
      value: <Properties />,
      icon: propertyIcon,
    },
    {
      key: "Vendidos",
      value: <Sold />,
      icon: soldIcon,
    },
  ];
  const [selected, setSelected] = useState("");

  return (
    <div className="parent w-full h-full">
      <header className="header h-full w-full bg-primary-100">
        <img src={logo} alt="company-logo" className="ml-4 w-[82px] h-[82px]" />
      </header>

{/* Rendering sidebar list */}
      <aside 
        className="navbar w-full bg-customWhite-100 h-full flex flex-col gap-2 px-4 py-2"
      >
        {sideBar.map((element, idx) => (
          <article
            key={ idx }
            className={`${
              selected == element.key ? 
                "bg-primary-500 rounded-xl font-semibold text-white" : 
                "text-customGray-100"
            } flex gap-2 hover:cursor-pointer py-2 px-4`}
            onClick={() => setSelected(element.key)}
          >
            <img className="text-white" width={24} height={24} src={ element.icon } alt={`icon-${idx}`} />{ element.key }
          </article>
        ))}
      </aside>

{/* Choose selected component */}
      <main className="main w-full h-full pr-2 py-2">
        { selected == 'Dashboard' ? <Dashboard /> : selected == 'Imóveis' ? <Properties /> : selected == 'Vendidos' ? <Sold /> : '' }
      </main>
    </div>
  );
};

export default App;
