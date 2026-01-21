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
            {/* Left Column - Visual Art */}
            <div className={styles.visualColumn}>
                <div className={styles.visualContent}>
                    <div className={styles.lockIcon}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3z" fill="currentColor" />
                        </svg>
                    </div>
                    <h1 className={styles.visualTitle}>Secure Access</h1>
                    <p className={styles.visualSubtitle}>
                        Your workspace is protected with two-factor authentication
                    </p>
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>⚡</div>
                            <div className={styles.featureText}>
                                <h3>Instant Verification</h3>
                                <p>Fast and reliable authentication</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🛡️</div>
                            <div className={styles.featureText}>
                                <h3>Protected Data</h3>
                                <p>Your information stays safe</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.gridPattern}></div>
            </div>

            {/* Right Column - Form */}
            <div className={styles.formColumn}>
                <div className={styles.formWrapper}>
                    <div className={styles.formCard}>
                        <div className={styles.header}>
                            <div className={styles.logo}>
                                <span className={styles.logoIcon}>🔐</span>
                                <span className={styles.logoText}>DevKit</span>
                            </div>
                            <h2 className={styles.title}>Two-Factor Authentication</h2>
                            <p className={styles.subtitle}>
                                Enter the 6-digit code from your authenticator app
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="code" className={styles.label}>
                                    Verification Code
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
                                <span className={styles.inputHint}>
                                    Code expires in 60 seconds
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={code.length !== 6 || loading}
                                className={styles.button}
                            >
                                {loading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Verifying…
                                    </>
                                ) : (
                                    'Unlock Workspace'
                                )}
                            </button>
                        </form>

                        <div className={styles.footer}>
                            <p className={styles.footerText}>
                                Lost your device? Contact your administrator
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}