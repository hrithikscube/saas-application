import Link from 'next/link';
import Input from '../common/Input';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PrimaryButton from '../common/PrimaryButton';

const initial_states = {
    email: '',
    password: '',
    confirm_password: ''
}

const initial_errors = {
    email: '',
    password: '',
    confirm_password: ''
}

const Signup = () => {

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
        router.push('/login')
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
                    value={params?.email}
                />

                <Input
                    required
                    type="password"
                    name="password"
                    handleChange={handleChange}
                    label="Password"
                    value={params?.password}
                />

                <Input
                    required
                    type="password"
                    name="confirm_password"
                    handleChange={handleChange}
                    label="Confirm Password"
                    value={params?.confirm_password}
                />

                <PrimaryButton type="submit" label="Signup" />

                <p className='lg:text-base text-sm'>Alread have an account? Login <Link className='hover:underline' href="/login">here</Link></p>

            </form>

        </div>
    )
}

export default Signup