import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/useSignIn';

export default function SignIn() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

	const {setUserData} = useContext(UserContext);

	async function userLogin(e){
		e.preventDefault();
		
    try {
      const userData = await signIn(username, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
	}

  
  return (
    <>
      <Card>
				<h1>My Travel Journal</h1>
				<Form onSubmit={userLogin}>
					<input
						type="username"
						placeholder="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						disabled = {loadingSignIn}
						required
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled = {loadingSignIn}
						required
					/>
					<button type="submit" disabled={loadingSignIn}>Log In</button>
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