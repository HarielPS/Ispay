import React, { useState, useEffect } from 'react';
import { QrReader } from '@react-qr/scanner';

const QrCodeScanner = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Obtener la lista de dispositivos de video (cámaras)
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === 'videoinput'
      );
      setDevices(videoDevices);
      // Selecciona la primera cámara por defecto (usualmente la cámara trasera en móviles)
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    });
  }, []);

  const handleScan = (result) => {
    if (result) {
      console.log(result.text); // Muestra el texto del código QR
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <div>
      <h3>Selecciona la cámara:</h3>
      <select onChange={handleDeviceChange} value={selectedDevice}>
        {devices.map((device, idx) => (
          <option key={idx} value={device.deviceId}>
            {device.label || `Cámara ${idx + 1}`}
          </option>
        ))}
      </select>

      {selectedDevice && (
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result);
            } else if (error) {
              handleError(error);
            }
          }}
          constraints={{ video: { deviceId: selectedDevice } }} // Selecciona la cámara según la opción elegida
          style={{ width: '300px' }}
        />
      )}
    </div>
  );
};

export default QrCodeScanner;
