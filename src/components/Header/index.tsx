import Logo from '../../assets/logo.svg';
import IconSignOut from '../../assets/sign-out.svg';
import toasts from '../../helpers/toastify';
import useGlobalContext from '../../hooks/useGlobalContext';
import './style.css';

export default function Header() {
  const { removeAuthToken } = useGlobalContext();

  const handleSignOut = () => {
    toasts.notifySuccess("Logout realizado com sucesso");
    removeAuthToken();
  }

  return (
    <div className="header-container">
      <header>
        <div className="header-left">
          <img src={Logo} alt="Logo fullstack" />
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder='BUSCA por um veículo'
          />
          <img src={IconSignOut} alt="Sign Out" onClick={handleSignOut} />
        </div>
      </header>
    </div>
  );
}