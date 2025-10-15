'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/atoms/button';
import {cn} from '@/lib/utils';
import {useAuthStore} from '@/store/useAuthStore';
import {signOut} from "@/services/authService";

const links = [
    {href: '/recipes', label: 'All Recipes'},
    {href: '/recipes/my', label: 'My Recipes'},
    {href: '/add-recipe', label: 'Add Recipe'},
];

export const Header = () => {
    const pathname = usePathname();
    const {user} = useAuthStore();

    const handleLogout = async () => {
        signOut()
    };


    return (
        <header
            className="w-full border-b bg-white/70 backdrop-blur-md top-0 z-50 fixed"
        >
            <div
                className="max-w-6xl mx-auto flex items-center justify-between p-4"
            >
                <Link href="/" className="text-xl font-bold">
                    Viso RecipeApp
                </Link>

                {user ? (
                    <nav className="flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-sm font-medium transition hover:text-primary',
                                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
               Hello {user.firstName}
              </span>
                            <Button
                                variant="outline" size="sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </nav>
                ) : (
                    <div className="flex items-center gap-3">
                        <Button asChild variant={pathname === '/login' ? 'ghost' : 'default'} size="sm">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild size="sm" variant={pathname === '/register' ? 'ghost' : 'default'}>
                            <Link href="/register">Sign up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};
