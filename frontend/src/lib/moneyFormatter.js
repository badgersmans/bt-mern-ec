const formatMoney = (amount = 0) => {
  const options = {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  };

  //check if no .00 at the end of dollar...
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-MY', options);

  return formatter.format(amount / 100);
};

export default formatMoney;
