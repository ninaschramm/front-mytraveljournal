import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/useSignIn';
import Card from '../../components/Card';
import Form from '../../components/Form';
import Link from '../../components/Link';

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
					<button type="submit" disabled={loadingSignIn}>Login</button>
				</Form>
        <Link to="/signup">Não possui login? Inscreva-se</Link>
      </Card>     
    </>
  );
}

