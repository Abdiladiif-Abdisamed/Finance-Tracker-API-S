import { useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [me, setMe] = useState(user);
  const [file, setFile] = useState(null);

  useEffect(()=>{
    axiosClient.get('/auth/profile').then(res => setMe(res.data));
  },[]);

  const upload = async () => {
    if (!file) return alert('Choose an image');
    const fd = new FormData();
    fd.append('file', file);
    const res = await axiosClient.post('/upload/profile-picture', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    login({ ...me, avatarUrl: res.data.avatarUrl }, localStorage.getItem('token'));
    setMe(prev => ({ ...prev, avatarUrl: res.data.avatarUrl }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <div className="flex items-center gap-4">
        <img src={me?.avatarUrl || 'https://via.placeholder.com/80'} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h2 className="text-xl font-bold">{me?.name}</h2>
          <p className="text-gray-600">{me?.email}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button onClick={upload} className="bg-sky-600 text-white px-3 py-2 rounded">Upload</button>
      </div>
    </div>
  )
}
