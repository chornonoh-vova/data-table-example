export const formatNumber = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatPercent = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatUsdWithSymbol = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatAbbreviateNumber = (val: number) => {
  const symbols = ["", "k", "M", "B", "T", "P", "E"];
  const tier = (Math.log10(Math.abs(val)) / 3) | 0;

  if (tier === 0) return formatUsdWithSymbol(val);

  const suffix = symbols[tier] || "";
  const scale = Math.pow(10, tier * 3);
  const scaled = val / scale;

  return `$${formatNumber(scaled)}${suffix}`;
};
