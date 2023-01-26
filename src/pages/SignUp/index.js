import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSignUp from '../../hooks/useSignUp';

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password, username, confirmPassword);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/signin');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }
  
  return (
    <>
      <Card>
				<h1>My Travel Journal</h1>
				<Form onSubmit={submit}>
					<input
						type="username"
						placeholder="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						disabled = {loadingSignUp}
						required
					/>
          <input
						type="email"
						placeholder="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						disabled = {loadingSignUp}
						required
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled = {loadingSignUp}
						required
					/>
          <input
						type="password"
						placeholder="confirm your password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						disabled = {loadingSignUp}
						required
					/>
					<button type="submit" disabled={loadingSignUp}>Log In</button>
				</Form>
      </Card>     
    </>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-top: 50px;
  background-color: #fff;
  border-color: #fff;
  border-radius: 15px;
  color: rgba(0,0,0,.87);
  width: 390px;
  height: 520px;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;

const Form = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    input {
        height: 55px;
        padding-left: 15px;
        width: 95%;
        border-radius: 15px;
        border: #FFFFFF;
        box-shadow: rgba(99, 99, 99, 0.2) 2px 2px 8px 2px;;
        font-size: 20px;
        font-family: 'Oswald', sans-serif;
    }

    .disabled-button{
        background-color: #263a55;
        color: #7a7474;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button{
        background-color: #bac8ff;
        color: #FFFFFF;
        font-family: 'Oswald', sans-serif;
        font-size: 20px;
        height: 55px;
        width: 80%;
        border-radius: 6px;
        border: none;
    }
`