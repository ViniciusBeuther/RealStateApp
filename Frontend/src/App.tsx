import React from "react";

const App: React.FC = () => {
  return(
    <div className="parent w-full h-full">
    <header className="header w-full bg-sky-400">
      Header
    </header>
      <aside className="navbar w-full h-full bg-sky-500">
        aside
      </aside>
      <main className="main w-full h-full bg-sky-600">
        mainflow
      </main>
    </div>
  )
}

export default App;