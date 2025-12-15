import { z } from 'zod';

export const totpRequestSchema = z.object({
    code: z
        .string()
        .nonempty('Code is required')
        .trim()
        .regex(/^\d{6}$/, 'Code must be a 6-digit string'),
});

export type TotpRequest = z.infer<typeof totpRequestSchema>;