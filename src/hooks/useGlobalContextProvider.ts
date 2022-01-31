import React, { useState } from 'react';
import IVeiculo from '../interfaces/veiculo';
import IFormulario from '../interfaces/formulario';
import { useLocalStorage } from 'react-use';

export default function useGlobalContextProvider() {
  const [veiculos, setVeiculos] = useState<Array<IVeiculo>>([]);
  const [veiculoDetalhado, setVeiculoDetalhado] = useState<IVeiculo>({
    id: 0,
    veiculo: "",
    marca: "",
    ano: "",
    descricao: "",
    vendido: false
  });
  const [modalAberto, setModalAberto] = useState<Boolean>(false);
  const [tipoModal, setTipoModal] = useState<String>("");
  const [formulario, setFormulario] = useState<IFormulario>({
    veiculo: "",
    marca: "",
    ano: "",
    descricao: "",
    vendido: false
  });
  const [authToken, setAuthToken, removeAuthToken]
    : [String | undefined, React.Dispatch<String>, () => void]
    = useLocalStorage('auth-token');

  const updateVeiculos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/veiculos`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      });
      const novosVeiculos = await response.json();
      setVeiculos(novosVeiculos);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return {
    veiculos,
    setVeiculos,
    veiculoDetalhado,
    setVeiculoDetalhado,
    modalAberto,
    setModalAberto,
    tipoModal,
    setTipoModal,
    formulario,
    setFormulario,
    authToken,
    setAuthToken,
    removeAuthToken,
    updateVeiculos
  }
}