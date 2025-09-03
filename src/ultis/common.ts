export const formatUSD = (n: number, locale: string = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(
    n
  );
export const discounted = (price: number, percent: number) => {
  if (!percent || percent <= 0) return price;
  return Math.round(price * (1 - percent / 100));
};
