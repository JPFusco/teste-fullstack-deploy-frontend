import { useEffect } from 'react';
import IconeExcluir from '../../assets/delete-icon.svg';
import IconeEditar from '../../assets/icone-editar.svg';
import VendidoFalse from '../../assets/vendido-false.svg';
import VendidoTrue from '../../assets/vendido-true.svg';
import toasts from '../../helpers/toastify';
import useGlobalContext from '../../hooks/useGlobalContext';
import './style.css';

export default function DetalhesVeiculo() {
  const {
    setTipoModal,
    setModalAberto,
    formulario,
    setFormulario,
    veiculoDetalhado,
    authToken,
    updateVeiculos
  } = useGlobalContext();

  const handleClick = (): void => {
    setTipoModal("Editar");
    setModalAberto(true);
  }

  useEffect(() => {
    setFormulario({
      veiculo: veiculoDetalhado.veiculo,
      marca: veiculoDetalhado.marca,
      ano: veiculoDetalhado.ano,
      descricao: veiculoDetalhado.descricao,
      vendido: veiculoDetalhado.vendido
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [veiculoDetalhado]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/veiculos/${veiculoDetalhado.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status >= 400) {
        const error = response.json();
        throw error;
      }

      toasts.notifySuccess("Veículo excluído com sucesso");
      updateVeiculos();
    } catch (error: any) {
      if (error.message) {
        toasts.notifyError(error.message);
        return;
      }

      toasts.notifyError(error);
    }
  }

  return (
    <div className="detalhes-container">
      <h1 className='nome'>
        {formulario.veiculo}
      </h1>
      <div className="outros-detalhes">
        <div className="outro-detalhe-container">
          <h2>
            Marca
          </h2>
          <h3>
            {formulario.marca}
          </h3>
        </div>
        <div className="outro-detalhe-container">
          <h2>
            Ano
          </h2>
          <h3>
            {formulario.ano}
          </h3>
        </div>
      </div>
      <p>
        {formulario.descricao}
      </p>
      <div className="detalhes-footer">
        <button onClick={handleClick}>
          <img src={IconeEditar} alt="Editar veículo" />
          <span>EDITAR</span>
        </button>
        <div className="footer-imgs">
          <img
            className='status-vendido'
            src={formulario.vendido ? VendidoTrue : VendidoFalse}
            alt={formulario.vendido ? "Veículo vendido" : "Veículo não foi vendido"}
          />
          <img
            className='excluir'
            src={IconeExcluir}
            alt="Excluir veículo"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}