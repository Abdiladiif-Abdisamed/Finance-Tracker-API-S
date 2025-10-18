import { useForm } from 'react-hook-form';
import axiosClient from '../api/axiosClient';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post('/auth/register', data);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register('name')} placeholder="Full name" className="border p-2 rounded" />
        <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
        <input {...register('password')} type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-sky-600 text-white py-2 rounded">Create account</button>
      </form>
      <p className="text-sm mt-3">Have an account? <Link to="/login" className="text-sky-600">Login</Link></p>
    </div>
  )
}
