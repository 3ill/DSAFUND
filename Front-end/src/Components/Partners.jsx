const Partners = () => {
  const clients = [
    {
      id: 1,
      name: "UHURU NFT",
    },
    {
      id: 2,
      name: "HEADSBYBNXN",
    },
    {
      id: 3,
      name: "FLOATS",
    },
    {
      id: 4,
      name: "NFT NG",
    },
  ];

  return (
    <section className="mt-[48px] flex flex-col justify-center">
      <div className="flex justify-center self-center flex-col">
        <h1 className="text-[36px] font-semibold font-Orbitron text-white mb-[10px] animate-slide-down">
          OUR CLIENTS
        </h1>
      </div>
      <div className="flex flex-row justify-between bg-white opacity-25">
        {clients.map((c, index) => (
          <div
            key={c.id}
            className={`${index === 0 ? "ml-[20px]" : ""} ${
              index === clients.length - 1 ? "mr-[0px]" : ""
            }`}
          >
            <button className="font-semibold font-Orbitron text-[#00BFFF] text-[24px]">
              {c.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
