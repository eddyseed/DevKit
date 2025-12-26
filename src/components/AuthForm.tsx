'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from '@/styles/auth/totp_win.module.css';

export default function AuthForm() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('from') || '/';

    useEffect(() => {
        document.title = 'Login - DevKit';
    }, []);

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
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>🔐 DevKit</h1>
                    <p className={styles.subtitle}>
                        Enter your TOTP code to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="code" className={styles.label}>
                            6-Digit Code
                        </label>
                        <input
                            id="code"
                            type="text"
                            inputMode="numeric"
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value.replace(/\D/g, ''))
                            }
                            maxLength={6}
                            placeholder="000000"
                            className={styles.input}
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={code.length !== 6 || loading}
                        className={styles.button}
                    >
                        {loading ? 'Verifying…' : 'Unlock'}
                    </button>
                </form>
            </div>
        </div>
    );
}
