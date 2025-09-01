import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputField from '/src/components/InputField.jsx';
import Button from '/src/components/Button.jsx';
import Spinner from '/src/components/Spinner.jsx';
import Alert from '/src/components/Alert.jsx';
import AuthFormContainer from '/src/components/AuthFormContainer.jsx';

const RegisterPage = ({ onLoginSuccess }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
    }

    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const body = { name, email, password };

        const { data } = await axios.post('https://mediq-api.onrender.com/api/users/register', body, config);
        
        onLoginSuccess(data.token);

    } catch (err) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Create a new account">
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <Alert message={error} type="error" />}
            <InputField label="Full Name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Bran Stark" />
            <InputField label="Email address" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            <InputField label="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            <div>
                <Button type="submit" fullWidth={true}>
                    {isLoading ? <Spinner /> : 'Register'}
                </Button>
            </div>
        </form>
         <p className="mt-6 text-center text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
                Sign in
            </Link>
        </p>
    </AuthFormContainer>
  );
};

export default RegisterPage;

