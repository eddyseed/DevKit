'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

import styles from '@/styles/auth/auth-form.module.css';


export default function AuthForm() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('from') || '/';

    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_APP_NAME} - Authenticate`;
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(code)) {
            toast.error('A 6-digit code is required.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/totp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            if (res.status === 401) {
                toast.error('Muggles are not allowed in here!');
                return;
            }
            const data = await res.json();

            if (!res.ok || !data.ok) {
                toast.error(data.error || 'Invalid code. Please try again.');
                return;
            }

            toast.success('Verified. Welcome back, wizard!');
            router.push(redirectTo);
            router.refresh();
        } catch {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />

            <div className={styles.scrollCard}>
                <div className={styles.scrollBody}>

                    <div className={styles.header}>
                        <div className={styles.crestIcon}>
                            <span role="img" aria-label="lock">🔒</span>
                        </div>
                        <h1 className={styles.title}>
                            Two-Factor Authentication
                            <span className={styles.titleAccent}>{process.env.NEXT_PUBLIC_APP_NAME} - Secure Access</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Enter the 6-digit code from your authenticator app to continue.
                        </p>
                    </div>

                    <div className={styles.divider} />

                    <label htmlFor="code" className={styles.label}>
                        Verification Code
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="code"
                            type="text"
                            inputMode="numeric"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                            placeholder="······"
                            className={styles.input}
                            autoFocus
                            disabled={loading}
                        />
                    </div>
                    <p className={styles.inputHint}>
                        Code expires after 60 seconds
                    </p>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={code.length !== 6 || loading}
                        className={styles.button}
                    >
                        {loading ? (
                            <>
                                <span className={styles.spinner} />
                                Verifying…
                            </>
                        ) : (
                            'Continue'
                        )}
                    </button>

                    <div className={styles.footer}>
                        <p className={styles.footerText}>
                            Lost access to your authenticator? Contact your wizard administrator to regain entry.
                        </p>
                    </div>

                </div>
            </div>

            <div className={styles.mottoBar}>
                <span className={styles.mottoText}>Draco Dormiens Nunquam Titillandus</span>
                <span className={styles.mottoDot}>◆</span>
                <span className={styles.mottoText}>{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </div>
        </div>
    );
}