const formatMoney = (amount = 0) => {
  const dollars = amount / 100;
  const options = {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  };

  //check if no .00 at the end of dollar...
  if (dollars % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-MY', options);

  return formatter.format(amount).replace(/(\.|,)00$/g, '');
};

export default formatMoney;
