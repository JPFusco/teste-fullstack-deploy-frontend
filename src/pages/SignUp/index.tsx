import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import useGlobalContexts from '../../hooks/useGlobalContext';
import toasts from '../../helpers/toastify';
import './style.css';

interface IFormularioCadastro {
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function SignUp() {
  const [formularioCadastro, setFormularioCadastro] = useState<IFormularioCadastro>({
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const { authToken } = useGlobalContexts();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormularioCadastro({
      ...formularioCadastro,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formularioCadastro.email || !formularioCadastro.senha || !formularioCadastro.confirmarSenha) {
        return console.warn("Todos os campos são obrigatórios");
      }

      const senhasIguais = formularioCadastro.senha === formularioCadastro.confirmarSenha;

      if (!senhasIguais) {
        return toasts.notifyError("As senhas precisam ser iguais");
      }

      const { confirmarSenha, ...body } = formularioCadastro;
      const resposta = await fetch(`${process.env.REACT_APP_API_URL}/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (resposta.status >= 400) {
        const error = await resposta.json();
        throw error;
      }

      toasts.notifySuccess("Cadastro realizado com sucesso");
      navigate('/');
    } catch (error: any) {
      if (error.message) {
        return toasts.notifyError(error.message);
      }

      toasts.notifyError(error);
    }

  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-left">
        <img src={Logo} alt="Logo da Fullstack" />
      </div>
      <div className="sign-up-right">
        <h1>
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="E-mail"
            variant="standard"
            sx={{ marginBottom: '15px' }}
            value={formularioCadastro.email}
            onChange={handleChange}
          />
          <TextField
            id="senha"
            name="senha"
            label="Senha"
            variant="standard"
            type="password"
            sx={{ marginBottom: '15px' }}
            value={formularioCadastro.senha}
            onChange={handleChange}
          />
          <TextField
            id="confirmarSenha"
            name="confirmarSenha"
            label="Confirmar Senha"
            variant="standard"
            type="password"
            sx={{ marginBottom: '35px' }}
            value={formularioCadastro.confirmarSenha}
            onChange={handleChange}
          />
          <button type='submit'>
            CADASTRAR
          </button>
        </form>
        <h2>
          Possui uma conta? <Link to='/'>Entrar</Link>
        </h2>
      </div>
    </div>
  );
}