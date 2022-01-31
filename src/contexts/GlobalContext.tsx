import React, { createContext } from 'react';
import useGlobalContextProvider from '../hooks/useGlobalContextProvider';
import IVeiculo from '../interfaces/veiculo';
import IFormulario from '../interfaces/formulario';

interface IGlobalContext {
  veiculos: Array<IVeiculo>;
  setVeiculos: React.Dispatch<React.SetStateAction<IVeiculo[]>>;
  veiculoDetalhado: IVeiculo;
  setVeiculoDetalhado: React.Dispatch<React.SetStateAction<IVeiculo>>;
  modalAberto: Boolean;
  setModalAberto: React.Dispatch<React.SetStateAction<Boolean>>;
  tipoModal: String;
  setTipoModal: React.Dispatch<React.SetStateAction<String>>;
  formulario: IFormulario;
  setFormulario: React.Dispatch<React.SetStateAction<IFormulario>>;
  authToken: String | undefined;
  setAuthToken: React.Dispatch<String>;
  removeAuthToken: () => void;
  updateVeiculos: () => void;
}

export const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const globalContextProvider = useGlobalContextProvider();

  return (
    <GlobalContext.Provider value={globalContextProvider}>
      {children}
    </GlobalContext.Provider>
  );
}