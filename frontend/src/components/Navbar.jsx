import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-sky-600">Finance Tracker</Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/transactions" className="text-sm hover:text-sky-600">Transactions</Link>
              <Link to="/profile" className="text-sm hover:text-sky-600">Profile</Link>
              <button onClick={logout} className="text-sm bg-sky-600 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-sky-600">Login</Link>
              <Link to="/register" className="text-sm bg-sky-600 text-white px-3 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
