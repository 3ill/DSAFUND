export const connectWallet = async (handleError, handleDisconnect) => {
  if (window.ethereum) {
    try {
      // Check if the wallet is already connected
      const isWalletConnected = localStorage.getItem("isWalletConnected");
      if (isWalletConnected === "true") {
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        if (networkId !== "5") {
          handleError();
          return false;
        }
        return true;
      }

      // Request access to the user's MetaMask account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      if (networkId !== "5") {
        handleError();
        return false;
      }

      // Add an event listener for disconnection
      window.ethereum.on("accountsChanged", (newAccounts) => {
        if (newAccounts.length === 0) {
          handleDisconnect();
        }
      });

      localStorage.setItem("isWalletConnected", "true");
      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return false;
    }
  } else {
    console.error("MetaMask extension not detected");
    return false;
  }
};
