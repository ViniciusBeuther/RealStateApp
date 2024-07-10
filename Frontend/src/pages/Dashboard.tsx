import DashboardChart from "../Components/DashboardChart";
import DashboardTable from "../Components/DashboardTable";


const Dashboard:React.FC = () => {
    return(
        <section className="DashboardBackgroundPattern w-full h-full rounded-xl p-5">
            <article className="DashboardGridParent">
                <div className="DashboardChildren01 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>1.000+</h1>
                    <p>Propriedades Vendidas</p>
                </div>
                <div className="DashboardChildren02 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>R$ 1.000.000,00+</h1>
                    <p>Faturados</p>
                </div>
                <div className="DashboardChildren03 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>120</h1>
                    <p>Imóveis Disponíveis</p>
                </div>
                <div className="DashboardChildren04 DashboardInformativeBox text-primary-600 bg-customWhite-100 shadow-lg">
                    <h1>12</h1>
                    <p>Clientes</p>
                </div>
                <div className="DashboardChildren05 DashboardTableParent">
                    <DashboardTable />
                </div>
                <div className="DashboardChildren06 DashboardChartParent flex items-center flex-col justify-start gap-2 shadow-lg text-white">
                    <h1>Imóveis Vendidos durante o Ano</h1>
                    <DashboardChart />
                </div>
            </article>
        </section>
    )
}

export default Dashboard;