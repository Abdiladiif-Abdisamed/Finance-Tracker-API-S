import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function AdminOverview() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    axiosClient.get('/admin/overview').then(res=>setData(res.data)).catch(console.error);
  },[]);

  if (!data) return <div className="max-w-4xl mx-auto p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Overview</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{data.totalUsers}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Total Income</p>
          <p className="text-2xl font-bold text-green-600">${data.totalIncome}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Total Expense</p>
          <p className="text-2xl font-bold text-red-600">${data.totalExpense}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h2 className="font-semibold mb-3">Top Categories</h2>
        <ul className="list-disc pl-6">
          {data.topCategories.map((c)=> (
            <li key={c._id}>{c._id}: {c.total}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
