'use client'

import React from 'react';
import {useForm} from 'react-hook-form';
import {useAuthStore} from '@/store/useAuthStore';
import {register as registerUser} from '@/services/authService';
import {FormField} from '@/components/molecules/FormField';
import {Button} from '@/components/atoms/button';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';

type RegisterFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<RegisterFormValues>();
    const setUser = useAuthStore(state => state.setUser);
    const router = useRouter();

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const user = await registerUser(data)
            console.log(data)
            setUser(user);
            toast.success('Registration successful');
            router.push('/');
        } catch (err) {
            console.error(err);
            toast.error('Registration error');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow"
        >
            <FormField
                label="First Name"
                error={errors.firstName?.message}
                {...register('firstName', {
                    required: 'First name is required',
                    minLength: {value: 2, message: 'Minimum 2 characters'},
                })}
            />

            <FormField
                label="Last Name"
                error={errors.lastName?.message}
                {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {value: 2, message: 'Minimum 2 characters'},
                })}
            />

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
                {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
        </form>
    );
};

export default RegisterForm;
