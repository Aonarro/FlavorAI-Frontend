'use client';

import {useEffect, useState} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {fetchUser} from '@/services/authService';
import {usePathname, useRouter} from 'next/navigation';

export function AuthProvider() {
    const { user, isAuthChecked, setAuthChecked } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {

        const initAuth = async () => {
            try {
                await fetchUser();
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setAuthChecked(true);
            }
        };


        initAuth();
    }, [setAuthChecked]);


    useEffect(() => {
        if (!isAuthChecked) return;

        const publicRoutes = ['/', '/login', '/register'];
        const isPublicRoute = publicRoutes.includes(pathname);

        if (user && isPublicRoute) {

            router.push('/recipes');
        } else if (!user && !isPublicRoute) {

            router.push('/login');
        }
    }, [user, isAuthChecked, pathname, router]);

    if (!isAuthChecked) {
        return (
            <div
                className="fixed inset-0 flex items-center justify-center bg-background"
            >
                <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
                ></div>
            </div>
        );
    }

    return null;
}