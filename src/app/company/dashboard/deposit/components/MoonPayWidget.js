// components/MoonPayWidget.js
"use client";
import { useEffect } from "react";

const MoonPayWidget = ({isVisible}) => {
  useEffect(() => {
    const loadMoonPaySdk = () => {
      const script = document.createElement("script");
      script.src =
        "https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js";
      script.async = true;
      script.onload = () => {
        const moonpaySdk = window.MoonPayWebSdk.init({
          flow: "buy",
          environment: "sandbox", // Cambia a 'production' para producción
          variant: "overlay",
          params: {
            apiKey: "pk_test_123", // Reemplaza con tu clave pública de MoonPay
            baseCurrencyCode: "usd",
            baseCurrencyAmount: "40",
            defaultCurrencyCode: "eth",
            showOnlyCurrencies: "btc,eth",
            language: "en",
          },
        });

        // Abre el widget
        moonpaySdk.show();
      };

      document.body.appendChild(script);
    };

    loadMoonPaySdk();

    // Limpiar el script cuando el componente se desmonte
    return () => {
      const script = document.querySelector(
        'script[src="https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [isVisible]);

  return null;
};

export default MoonPayWidget;
