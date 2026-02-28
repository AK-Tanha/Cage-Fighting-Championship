"use client";

import React, { useState } from 'react';

const AdminLoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Refresh the page to let the layout pick up the new cookie
                window.location.reload();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white border border-black/5 rounded-sm p-8 shadow-sm">
            <div className="text-center mb-8">
                <div className="bg-[#FE0002] text-white w-12 h-12 flex items-center justify-center rounded-sm text-2xl mx-auto mb-4">
                    <span className="font-display font-black">C</span>
                </div>
                <h1 className="font-display font-black text-2xl tracking-tighter uppercase">Admin Login</h1>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mt-2">Restricted Access</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-[#FE0002] border border-red-100 rounded-sm text-xs font-bold uppercase tracking-widest text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-700">Email Address</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-black/10 rounded-sm p-3 text-sm focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-black"
                        placeholder="admin@cfc.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-black/10 rounded-sm p-3 text-sm focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-black"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FE0002] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-8 text-center border-t border-black/5 pt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Protected by CFC Global Systems
            </div>
        </div>
    );
};

export default AdminLoginForm;
