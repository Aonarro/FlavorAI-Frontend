'use client';

import { useEffect } from 'react';
import { fetchUser } from '@/services/authService';

export function AuthProvider() {
    useEffect(() => {
        fetchUser();
    }, []);

    return null;
}