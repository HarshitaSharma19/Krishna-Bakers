import { createContext, useContext, useState, useCallback } from "react";

// 1 USD ≈ 83.5 INR (static conversion rate)
export const USD_TO_INR = 83.5;

const CurrencyCtx = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD"); // "USD" | "INR"

  const toggle = useCallback(() => {
    setCurrency((c) => (c === "USD" ? "INR" : "USD"));
  }, []);

  /** Format a price (stored in USD) to the current currency string */
  const fmt = useCallback(
    (priceUSD) => {
      if (currency === "INR") {
        const inr = priceUSD * USD_TO_INR;
        return `₹${inr.toFixed(0)}`;
      }
      return `$${priceUSD.toFixed(2)}`;
    },
    [currency]
  );

  return (
    <CurrencyCtx.Provider value={{ currency, toggle, fmt }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export function useCurrency() {
  const c = useContext(CurrencyCtx);
  if (!c) throw new Error("useCurrency must be used inside CurrencyProvider");
  return c;
}
