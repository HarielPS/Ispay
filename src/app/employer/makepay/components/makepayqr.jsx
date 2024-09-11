import React from 'react';
import QRCode from 'qrcode.react';

const QrCodeGenerator = ({ walletDestino, monto, walletProviene, token, descripcion }) => {
  // Datos a codificar en el QR
  const qrData = JSON.stringify({
    walletDestino,
    monto,
    walletProviene,
    token,
    descripcion,
  });

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>QR Code para transacción</h3>
      <QRCode value={qrData} size={256} />
      <div style={{ marginTop: '10px' }}>
        <p><strong>Destino:</strong> {walletDestino}</p>
        <p><strong>Monto:</strong> {monto}</p>
        <p><strong>Desde:</strong> {walletProviene}</p>
        <p><strong>Token:</strong> {token}</p>
        <p><strong>Descripción:</strong> {descripcion}</p>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
