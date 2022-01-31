import { useEffect } from 'react';
import AddVeiculo from '../../assets/add-veiculo.svg';
import CardVeiculo from '../../components/CardVeiculo';
import DetalhesVeiculo from '../../components/DetalhesVeiculo';
import Header from '../../components/Header';
import ModalNovoEditarVeiculo from '../../components/ModalNovoEditarVeiculo';
import useGlobalContext from '../../hooks/useGlobalContext';
import './style.css';


export default function Home() {

  const {
    veiculos,
    setVeiculos,
    modalAberto,
    setModalAberto,
    veiculoDetalhado,
    setVeiculoDetalhado,
    setTipoModal,
    authToken
  } = useGlobalContext();

  useEffect(() => {
    const buscarVeiculosIniciais = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/veiculos`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setVeiculos(data);
        setVeiculoDetalhado(data[0]);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    buscarVeiculosIniciais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (veiculos.length === 0) {
      return setVeiculoDetalhado({ veiculo: '', marca: '', ano: '', descricao: '', vendido: false, id: 0 });
    }

    setVeiculoDetalhado(veiculos[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [veiculos]);

  const handleAddClick = () => {
    setTipoModal("Novo");
    setModalAberto(true);
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className="add-veiculo">
          <span>VEÍCULO</span>
          <button>
            <img src={AddVeiculo} alt="Adicionar novo veículo" onClick={handleAddClick} />
          </button>
        </div>
        <div className="home-main-content">
          <div className="lista-veiculos">
            <h1>
              Lista de veículos
            </h1>
            {veiculos && veiculos.map(veiculo => <CardVeiculo key={veiculo.id} veiculo={veiculo} />)}
          </div>
          <div className="detalhes-veiculo">
            <h1>
              Detalhes
            </h1>
            {veiculoDetalhado.id !== 0 && <DetalhesVeiculo />}
          </div>
        </div>
        {modalAberto && <ModalNovoEditarVeiculo />}
      </div>
    </div>
  );
}