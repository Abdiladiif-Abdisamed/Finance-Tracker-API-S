import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Transactions() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', amount: 0, type: 'expense', category: 'Misc', date: new Date().toISOString().slice(0,10) });

  const load = () => axiosClient.get('/transactions').then(res => setList(res.data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, amount: Number(form.amount) };
    await axiosClient.post('/transactions', payload);
    setForm({ title: '', amount: 0, type: 'expense', category: 'Misc', date: new Date().toISOString().slice(0,10) });
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    await axiosClient.delete(`/transactions/${id}`);
    load();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3">Add Transaction</h2>
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="border p-2 rounded" type="number" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
          <select className="border p-2 rounded" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input className="border p-2 rounded" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <input className="border p-2 rounded" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
          <button className="bg-sky-600 text-white py-2 rounded">Save</button>
        </form>
      </div>

      <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3">Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map(tx => (
                <tr key={tx._id} className="border-b">
                  <td className="py-2">{tx.title}</td>
                  <td className={tx.type==='income' ? 'text-green-600' : 'text-red-600'}>{tx.amount}</td>
                  <td>{tx.type}</td>
                  <td>{tx.category}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td><button onClick={()=>del(tx._id)} className="text-red-600">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
