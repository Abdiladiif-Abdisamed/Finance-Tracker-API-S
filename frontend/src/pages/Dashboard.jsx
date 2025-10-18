import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    axiosClient.get(`/transactions/monthly-summary?year=${year}&month=${month}`)
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, [month, year]);

  const chartData = (summary?.categories || []).map(c => ({ name: c.category, value: Math.abs(c.categoryTotal) }));

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <input type="number" className="border p-2 rounded w-24" value={year} onChange={(e)=>setYear(e.target.value)} />
          <input type="number" min="1" max="12" className="border p-2 rounded w-20" value={month} onChange={(e)=>setMonth(e.target.value)} />
        </div>
      </div>

      {summary ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-2">Totals</h2>
            <div className="flex gap-6">
              <div>
                <p className="text-sm text-gray-500">Income</p>
                <p className="text-green-600 text-xl font-bold">${summary.totalIncome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expenses</p>
                <p className="text-red-600 text-xl font-bold">${summary.totalExpense}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Net</p>
                <p className="text-sky-600 text-xl font-bold">${summary.net}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 h-80">
            <h2 className="font-semibold mb-2">By Category</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
