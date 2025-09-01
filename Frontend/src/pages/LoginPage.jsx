import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';
import Spinner from '../components/Spinner.jsx';
import Alert from '../components/Alert.jsx';
import AuthFormContainer from '../components/AuthFormContainer.jsx';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = { email, password };
      const { data } = await axios.post('https://mediq-api.onrender.com/api/users/login', body, config);
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Sign in to your account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <Alert message={error} type="error" />}
        <InputField label="Email address" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="user@example.com" />
        <InputField label="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        <div>
          <Button type="submit" fullWidth={true}>
            {isLoading ? <Spinner /> : 'Sign In'}
          </Button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Not a member?{' '}
        <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
          Sign up now
        </Link>
      </p>
    </AuthFormContainer>
  );
};

export default LoginPage;

