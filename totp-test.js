import { authenticator } from 'otplib';

authenticator.options = {
    window: 2,
};

const secret = process.env.TOTP_SECRET;

if (!secret) {
    console.error('TOTP_SECRET not set');
    process.exit(1);
}

const token = authenticator.generate(secret);
console.log('Current TOTP token:', token);
