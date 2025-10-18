import { useForm } from 'react-hook-form';
import axiosClient from '../api/axiosClient';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post('/auth/login', data);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
        <input {...register('password')} type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-sky-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="text-sm mt-3">No account? <Link to="/register" className="text-sky-600">Register</Link></p>
    </div>
  )
}
