import { logo, robot } from "../assets/index";
import { useState, useEffect } from "react";
import { connectWallet } from "../utils/wallet";

const Hero = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNetworkError = () => {
    setErrorMessage("Please switch to the Goerli network");
  };

  const handleDisconnect = () => {
    localStorage.removeItem("isWalletConnected");
    setIsWalletConnected(false);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("isWalletConnected");
    if (storedValue === "true") {
      setIsWalletConnected(true);
    }
  }, []);

  return (
    <section className="overflow-x-hidden">
      <div className="flex flex-row justify-between">
        <img
          src={logo}
          alt="logo"
          className="w-[100px] opacity-50 mt-[5px] animate-slide-right"
        />

        <div className="flex justify-center flex-col items-center mr-[5px] ">
          <button
            className="w-[190px] h-[60px] border border-radius bg-[#00BFFF] rounded-[17px]  opacity-[60%] mt-[5px] animate-slide-left"
            onClick={async () => {
              if (isWalletConnected) {
                handleDisconnect();
              } else {
                const connected = await connectWallet(handleNetworkError);
                setIsWalletConnected(connected);
              }
            }}
          >
            <h1 className="font-semibold font-Orbitron text-[16px]">
              {isWalletConnected ? "Connected" : "Connect Wallet"}
            </h1>
          </button>
          {errorMessage && (
            <p className="text-red-500 font-work text-[12px] mt-[2px]">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between mt-[100px]">
        <div className="h-[305px] w-[596px] flex flex-col justify-start items-center">
          <h1
            className="h-[118px] w-[506px] font-semibold text-[96px] tracking-[0.03em] text-white font-Orbitron animate-slide-down
          "
          >
            DSACORP
          </h1>
          <div className="flex flex-row">
            <div className="vertical-line mt-[160px] " />
            <div className="flex flex-col w-[506px] h-[120px] ml-[126px]">
              <p className="font-semibold text-[16px] font-work tracking-[0.03em] leading[20px] text-white">
                Welcome to the exciting world of DSACORP, where we are rewriting
                the rules of community management and empowering individuals to
                embrace the transformative potential of Web3.
              </p>
              <div className="flex flex-row mt-[28px]">
                <button
                  className="w-[122px] h-[56px] bg-[#00BFFF] font-Orbitron"
                  onClick={() => {
                    window.open("https://instagram.com/dsa_corp", "_blank");
                  }}
                >
                  JOIN US
                </button>
                <button
                  className="w-[313px] h-[56px] ml-[37px] bg-[#00BFFF] font-Orbitron"
                  onClick={() => {
                    window.open(
                      "https://near.social/#/mob.near/widget/ProfilePage?accountId=dsacorp.near",
                      "_blank"
                    );
                  }}
                >
                  PARTNER WITH US
                </button>
              </div>
            </div>
          </div>
        </div>
        <img
          src={robot}
          alt="robot"
          className="sm:w-[300px] sm:h-[305px] sm:bottom-[450px] md:w-[645px] md:h-[650px]  absolute top-[calc(100vh - 37px)] right-3 md:bottom-[250px]  "
        />
      </div>
    </section>
  );
};

export default Hero;
