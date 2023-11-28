import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/constants";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
  const { isWeb3Enabled } = useMoralis();
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getPlayersLength } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getPlayersLength",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    const _entranceFee = (await getEntranceFee()).toString();
    const _playerLength = (await getPlayersLength()).toString();
    const _recentWinner = (await getRecentWinner()).toString();
    setEntranceFee(_entranceFee);
    setNumPlayers(_playerLength);
    setRecentWinner(_recentWinner);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction complete!",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    });
  };
  return (
    <div>
      {contractAddress ? (
        <div>
          EntranceFee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700"
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
              });
            }}
          >
            Enter raffle
          </button>{" "}
          <br />
          Number of Players : {numPlayers} <br />
          Recent winner : {recentWinner}
          <br />
        </div>
      ) : (
        <div>No raffle address detected!</div>
      )}
    </div>
  );
}
