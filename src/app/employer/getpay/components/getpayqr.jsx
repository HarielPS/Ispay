import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrReaderComponent = () => {
  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const { walletDestino, monto, walletProviene, token, descripcion } = parsedData;

        // Imprimir los datos desestructurados en la consola
        console.log("Destino:", walletDestino);
        console.log("Monto:", monto);
        console.log("Desde:", walletProviene);
        console.log("Token:", token);
        console.log("Descripción:", descripcion);

        setQrData(parsedData);
      } catch (error) {
        console.error("Error al procesar el QR:", error);
      }
    }
  };

  const handleError = (error) => {
    console.error("Error leyendo el QR:", error);
  };

  return (
    <div>
      <h3>Escanea el código QR</h3>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.text);
          }

          if (!!error) {
            handleError(error);
          }
        }}
        style={{ width: '100%' }}
      />
      
      {qrData && (
        <div>
          <h4>Datos Escaneados:</h4>
          <p><strong>Destino:</strong> {qrData.walletDestino}</p>
          <p><strong>Monto:</strong> {qrData.monto}</p>
          <p><strong>Desde:</strong> {qrData.walletProviene}</p>
          <p><strong>Token:</strong> {qrData.token}</p>
          <p><strong>Descripción:</strong> {qrData.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default QrReaderComponent;
