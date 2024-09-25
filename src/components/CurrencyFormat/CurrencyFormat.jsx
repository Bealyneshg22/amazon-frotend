import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({ amount }) => {
  const currencyFormated = numeral(amount).format("$0,0.00");
  return <div>{currencyFormated}</div>;
};

export default CurrencyFormat;
