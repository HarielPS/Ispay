"use client"
import React, { useEffect, useState } from 'react';
import { generarWalletYCifrarPrivateKey } from '@/components/wallet';
import { decryptPrivateKey } from '@/components/wallet';


export const Page = () => {
    async function generarUsuarioConWallet() {
        const walletData = await generarWalletYCifrarPrivateKey();
        
        if (walletData) {
          console.log("Wallet generada:", walletData);
          
          // Supongamos que ahora deseas mostrar la clave privada al usuario
          const decryptedPrivateKey = decryptPrivateKey(walletData.encryptedPrivateKey);
          console.log("Private Key descifrada:", decryptedPrivateKey);
          
          // Aquí es donde podrías mostrar la clave privada en la UI si lo necesitas
        }
      }
      
    const handleButton = () => {
        generarUsuarioConWallet();
    }

    return (
      <div>
          <button onClick={handleButton}>Press</button>
      </div>
    );
}

export default Page;
