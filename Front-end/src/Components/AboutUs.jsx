import { ethers } from "ethers";
import { abi } from "../utils/index";
import { useState, useEffect } from "react";

const AboutUs = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [investors, setInvestors] = useState([]);

  const fetchInvestors = async () => {
    const contractAddress = "0x0EA7BC0cF244C6C0fd9980242077285e584e9f6F";
    const rpc = "https://rpc.ankr.com/eth_goerli";
    const contractABI = abi;
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    try {
      const fetchedInvestors = await contract.getAllInvestors();
      setInvestors(fetchedInvestors);
      console.log(investors);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  };

  const handleInvest = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create an instance of the contract using the contract address and ABI
      const contractAddress = "0x0EA7BC0cF244C6C0fd9980242077285e584e9f6F";
      const contractABI = abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Prompt the user to enter the investment amount
      const amount = prompt("Enter the investment amount (in Ether):");
      if (!amount || isNaN(amount)) {
        throw new Error("Invalid investment amount");
      }

      // Convert the investment amount to Wei
      const amountWei = ethers.utils.parseEther(amount);

      // Call the invest function in the smart contract with the specified amount
      const transaction = await contract.invest({ value: amountWei });
      const receipt = await transaction.wait();
      await fetchInvestors();

      if (receipt.status === 1) {
        setStatusMessage("Investment successful");
      } else {
        // Transaction failed
        throw new Error("Investment transaction failed");
      }
    } catch (error) {
      // Error occurred during the investment process
      setErrorMessage("Investment error: " + error.message);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  return (
    <section className="mt-[200px]">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row w-[788px] h-[251px]">
            <div className="vertical-line2" />
            <div className="w-[761px] h-[235px] ml-[125px] flex flex-col">
              <h1 className="font-semibold font-Orbitron text-[36px] leading-[45px] spacing-[0.05em] text-white animate-slide-left">
                What We Do
              </h1>
              <div className="w-[761px] h-[145px] font-work">
                <p className="text-[16px] text-white">
                  At DSACORP, we believe that communities are the heartbeat of
                  the Web3 revolution. They serve as the catalysts for change,
                  igniting the spark of innovation and collaboration that
                  propels us towards a decentralized future. Thats why we have
                  made it our mission to unlock the full potential of
                  communities, harnessing their collective power to shape the
                  destiny of the blockchain industry
                </p>
              </div>
              <button
                className="w-[197px] h-[76px] rounded-[17px] bg-[#00BFFF] flex justify-center items-center ml-[535px] mb-[2px]"
                onClick={handleInvest}
              >
                <h1 className="font-Orbitron text-[16px]">INVEST</h1>
              </button>
              <div className="ml-[539px]">
                <h1 className="text-white font-Orbitron">
                  MINIMUM OF 25USD <br /> 0.013545 ETH
                </h1>
              </div>
              {statusMessage && (
                <p className="font-work font-semibold text-[16px] text-[#00BFFF]">
                  {statusMessage}
                </p>
              )}
              {errorMessage && (
                <p className="font-work font-semibold text-[16px] text-red-600">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
          <div className="w-[470px] h-[635px] rounded-[17px] investors-log flex flex-col mt-[35px] ml-[90px] md:hidden opacity-70 pop-up-animation">
            <div className="flex justify-center">
              <h1 className="text-[32px] text-white font-Orbitron">
                INVESTORS
              </h1>
            </div>
            <div className="mt-[2px] overflow-y-auto flex flex-col justify-center  ">
              {investors.map((addr) => (
                <div
                  key={addr}
                  className="mt-[5px] flex flex-col justify-center self-center"
                >
                  <h1 className="text-[16px] font-work text-[#00BFFF]">
                    {ethers.utils.getAddress(addr)}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" w-[470px] h-[635px] rounded-[17px] investors-log flex-col mt-[35px] mr-[30px] hidden  md:flex opacity-70 pop-up-animation">
          <div className="flex flex-col mt-[5px] justify-center self-center">
            <h1 className="text-[32px] text-white">INVESTORS</h1>
          </div>
          <div className="mt-[2px] overflow-y-auto flex flex-col justify-center  ">
            {investors.map((addr) => (
              <div
                key={addr}
                className="mt-[5px] flex flex-col justify-center self-center"
              >
                <h1 className="text-[16px] font-work text-[#00BFFF]">
                  {ethers.utils.getAddress(addr)}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
