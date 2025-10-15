'use client'

import React from 'react';
import {useForm} from "react-hook-form";
import {useAuthStore} from "@/store/useAuthStore";
import {login} from "@/services/authService";
import {FormField} from "@/components/molecules/FormField";
import {Button} from "@/components/atoms/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


type LoginFormValues = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<LoginFormValues>();
    const setUser = useAuthStore(state => state.setUser);
    const router = useRouter();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const user = await login(data);
            setUser(user);
            toast.success('Login successful');
            router.push('/');
        } catch (err) {
            console.error(err);
            toast.error('Login error');
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white "
        >
            <FormField
                label="Email"
                error={errors.email?.message}
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email address',
                    },
                })}
            />

            <FormField
                label="Password"
                type="password"
                error={errors.password?.message}
                {...register('password', {
                    required: 'Password is required',
                    minLength: {value: 6, message: 'Minimum 6 characters'},
                })}
            />

            <Button type="submit" disabled={isSubmitting} className="mt-2">
                {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
};

export default LoginForm;