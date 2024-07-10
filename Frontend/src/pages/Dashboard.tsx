
const Dashboard:React.FC = () => {
    return(
        <section className="w-full h-full bg-primary-200 rounded-xl p-5">
            <article className="DashboardGridParent">
                <div className="DashboardChildren01 DashboardInformativeBox text-white bg-primary-500 shadow-lg">
                    <h1>1.000+</h1>
                    <p>Propriedades Vendidas</p>
                </div>
                <div className="DashboardChildren02 DashboardInformativeBox text-white bg-primary-500 shadow-lg">
                    <h1>R$ 1.000.000,00+</h1>
                    <p>Faturados</p>
                </div>
                <div className="DashboardChildren03 DashboardInformativeBox text-white bg-primary-500 shadow-lg">
                    <h1>120</h1>
                    <p>Imóveis Disponíveis</p>
                </div>
                <div className="DashboardChildren04 DashboardInformativeBox text-white bg-primary-500 shadow-lg">
                    <h1>12</h1>
                    <p>Clientes</p>
                </div>
                <div className="DashboardChildren05 DashboardTableParent">5</div>
                <div className="DashboardChildren06 DashboardChartParent">6</div>
            </article>
        </section>
    )
}

export default Dashboard;