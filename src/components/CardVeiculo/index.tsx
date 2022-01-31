import VendidoFalse from '../../assets/vendido-false.svg';
import VendidoTrue from '../../assets/vendido-true.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import IVeiculo from '../../interfaces/veiculo';
import './style.css';

export default function CardVeiculo({ veiculo }: { veiculo: IVeiculo }) {
  const { veiculoDetalhado, setVeiculoDetalhado } = useGlobalContext();

  const handleClick = () => {
    setVeiculoDetalhado(veiculo);
  }

  return (
    <div className="card-container"
      onClick={handleClick}
      style={{ backgroundColor: veiculoDetalhado.id === veiculo.id ? "#F1F2F0" : "#FFFFFF" }}
    >
      <div className="card-left">
        <p className='marca'>
          {veiculo.marca}
        </p>
        <p className='nome'>
          {veiculo.veiculo}
        </p>
        <p className='ano'>
          {veiculo.ano}
        </p>
      </div>
      <div className="card-right">
        <img
          src={veiculo.vendido ? VendidoTrue : VendidoFalse}
          alt={veiculo.vendido ? "Veículo vendido" : "Veículo não foi vendido"}
        />
      </div>
    </div>
  );
}