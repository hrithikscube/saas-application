import Link from 'next/link';
import Input from '../common/Input';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PrimaryButton from '../common/PrimaryButton';

const initial_states = {
    email: '',
    password: ''
}

const initial_errors = {
    email: '',
    password: ''
}

const Login = () => {

    const router = useRouter()
    const [params, setParams] = useState(initial_states)
    const [errors, setErrors] = useState(initial_errors)

    const handleChange = (e) => {
        let { name, value } = e.target
        setParams({
            ...params,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/admin/dashboard')
    }

    return (
        <div className='grid lg:grid-cols-5 w-full h-screen'>

            <div className='lg:flex hidden flex-col bg-slate-200 w-full h-full lg:col-span-3'>

            </div>

            <form onSubmit={handleSubmit} className='flex flex-col bg-white w-full h-full lg:px-10 px-4 lg:py-20 py-10 lg:col-span-2 gap-4'>

                <h1 className='lg:text-2xl text-xl font-semibold text-[#121212]'>Welcome to SAAS Application</h1>

                <Input
                    required
                    type="email"
                    name="email"
                    handleChange={handleChange}
                    label="Email"
                />

                <Input
                    required
                    type="password"
                    name="password"
                    handleChange={handleChange}
                    label="Password"
                />

                <PrimaryButton type="submit" label="Login" />

                <p className='lg:text-base text-sm'>Don't have an account ? Register <Link className='hover:underline' href="/signup">here</Link></p>

            </form>




        </div>
    )
}

export default Login