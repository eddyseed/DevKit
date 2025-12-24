'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from '@/styles/auth/totp_win.module.css';

export default function AuthForm() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('from') || '/';
    document.title = "Login - DevKit";
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^\d{6}$/.test(code)) {
            toast.error('Please enter a valid 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/totp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                toast.error(data.error || 'Invalid code');
                return;
            }
            toast.success('Unlocked successfully');
            router.push(redirectTo);
            router.refresh();
        } catch {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.root}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Enter TOTP</h1>
                <input
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    placeholder="6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? 'Verifying…' : 'Unlock'}
                </button>
            </form>
        </main>
    );
}
