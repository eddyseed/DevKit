'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('from') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!/^\d{6}$/.test(code)) {
            setError('Please enter a valid 6-digit code.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/totp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            type ApiResponse = {
                ok: boolean;
                error?: string;
            };

            let data: ApiResponse;
            try {
                data = await res.json();
            } catch {
                setError('Invalid server response');
                return;
            }

            if (!res.ok || !data.ok) {
                setError(data.error || 'Invalid code');
                return;
            }

            // Cookie is now set, navigate to original page
            router.push(redirectTo);
            router.refresh();
        } catch (err) {
            setError('Something went wrong');
            console.log(`err`, err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                background: '#F5E9DD',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: '#FFFFFF',
                    padding: '1.5rem 2rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    minWidth: '280px',
                }}
            >
                <h1 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Enter TOTP</h1>
                <input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="6-digit code"
                    style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #D8C7B6',
                        marginBottom: '0.75rem',
                    }}
                />
                {error && (
                    <p style={{ color: '#b00020', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '999px',
                        border: 'none',
                        background: '#FFD2A1',
                        cursor: 'pointer',
                        fontWeight: 500,
                    }}
                >
                    {loading ? 'Verifying…' : 'Unlock'}
                </button>
            </form>
        </main>
    );
}
