const SpinnerComponent: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent flex items-center justify-center flex-col">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-primary-400 border-t-transparent"
      >
      </div>
      <p className="mt-2">Carregando</p>
    </div>
  );
};

export default SpinnerComponent;
