import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /* TAHAP 9 STATE */
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isFormValid = username.length >= 4 && password.length >= 6;

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Jeda 1,5 detik
        setTimeout(() => { 
            if (username === "nova" && password === "gudang123") {
                localStorage.setItem('isAuthenticated', 'true');
                setIsLoading(false);
                navigate('/dashboard');
            } else {
                setError('Username atau password salah.');
                setIsLoading(false);
            }
        }, 
        1500);
    };
        
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-container">
                    <div className="logo-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                    </div>
                </div>
                <h2>Masuk ke Sistem</h2>
                <p className="subtitle">Kelola inventaris Anda dengan mudah</p>

                {/* Error Message */}
                {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
                
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <span className="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="login-btn" 
                        disabled={!isFormValid || isLoading}
                        style={{ opacity: !isFormValid ? 0.5 : 1, cursor: !isFormValid ? 'not-allowed' : 'pointer' }}>
                        {isLoading ? 'Memeriksa...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
}