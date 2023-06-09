// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./PriceConverter.sol";

contract Dsafunding {
    event Invested(address indexed _investor, uint256 _amount);
    event Withdrawn(address indexed _investor, uint256 _amount);

    using PriceConverter for uint256;
    AggregatorV3Interface public priceFeed;

    address private owner;
    mapping(address => uint256) private investorAmounts;
    address[] private investors;
    uint256 public minimumFundInUSD = 20 * 1e18;

    /**
     *
     * @param _priceFeedAddress This is the pricefeed address of the chainlink node
     */
    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function invest() public payable {
        uint256 amount = msg.value;
        address investorAddress = msg.sender;

        //? getConversionRate is defined in the priceConverter library
        //! it accepts the priceFeed address to get the current conversion rate for the oracle node
        require(
            amount.getConversionRate(priceFeed) >= minimumFundInUSD,
            "You can't invest below $20"
        );
        //! this checks if the address is a new investor else it only updates amount funded
        if (investorAmounts[investorAddress] == 0) {
            investors.push(investorAddress);
        }

        investorAmounts[investorAddress] += amount;

        emit Invested(investorAddress, amount);
    }

    function getAllInvestors() public view returns (address[] memory) {
        address[] memory addresses = new address[](investors.length);

        for (uint256 i = 0; i < investors.length; i++) {
            addresses[i] = investors[i];
        }

        return (addresses);
    }

    function withdraw() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available for withdrawal");

        (bool success, ) = payable(owner).call{value: contractBalance}("");
        require(success, "Withdrawal failed");

        emit Withdrawn(owner, contractBalance);
    }
}
