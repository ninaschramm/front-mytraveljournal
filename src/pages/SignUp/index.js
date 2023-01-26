import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';
import Card from '../../components/Card';
import Form from '../../components/Form';
import Link from '../../components/Link';

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
      alert('As senhas devem ser iguais!');
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
					<button type="submit" disabled={loadingSignUp}>Register</button>
				</Form>
        <Link to="/signin">Já possui cadastro? Faça seu login</Link>
      </Card>     
    </>
  );
}

