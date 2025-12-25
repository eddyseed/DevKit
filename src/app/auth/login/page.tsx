import AuthForm from '@/components/AuthForm';
import Spinner from '@/components/Spinner';
import { Suspense } from 'react';
export default function LoginPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <AuthForm />
        </Suspense>
    )
}