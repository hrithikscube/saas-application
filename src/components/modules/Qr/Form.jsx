import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';
import Input from '@/components/common/Input';
import { showToastMessage } from '@/utils/toast';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';

const initial_states = {
    name: '',
    link: ''
}

const Form = ({ id, title }) => {
    const router = useRouter()
    const [params, setParams] = useState(initial_states)

    const handleChange = (e) => {
        let { name, value } = e.target
        setParams({
            ...params,
            [name]: value
        })
    }

    const [base64, setBase64] = useState('')

    useEffect(() => {
        if (params?.link !== '') {
            fetch('/api/generate-qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: params?.link || 'https://test.com' }),

            })
                .then((response) => response.json())
                .then((data) => setBase64(data.base64))
                .catch((error) => console.error(error))
        }
    }, [params?.link])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (id) {
            const { data, error } = await supabase
                .from('my-qr')
                .update([
                    { name: params?.name, link: params?.link },
                ])
                .eq('id', id)
                .select()

            if (error) {
                showToastMessage(error?.message || 'Something went wrong', 'error')
                return
            }
            else {
                showToastMessage('QR updated succesfully', 'success')
                setParams(initial_states)
                router.push('/admin/qr')
            }
        }
        else {
            const { data, error } = await supabase
                .from('my-qr')
                .insert([
                    { name: params?.name, link: params?.link },
                ])
                .select()

            if (error) {
                showToastMessage(error?.message || 'Something went wrong', 'error')
                return
            }
            else {
                showToastMessage('QR created succesfully', 'success')
                setParams(initial_states)
                router.push('/admin/qr')
            }
        }

    }

    const getQrById = async () => {
        let { data, error } = await supabase
            .from('my-qr')
            .select("*")
            .eq('id', id)
            .single();

        if (data) {
            setParams({
                name: data?.name,
                link: data?.link,
            })
        }
    }

    useEffect(() => {
        if (typeof id !== 'undefined') {
            getQrById()
        }
    }, [id])

    return (
        <div className='flex flex-col w-full gap-4'>

            <Head>
                <title>{title}</title>
            </Head>

            <div className='p-3 bg-gray-300 w-full rounded-md'>
                <h1 className='lg:text-base text-sm font-semibold text-[#121212]'>{title}</h1>
            </div>


            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid lg:grid-cols-2 items-start gap-4 w-full p-4 bg-white border border-[#808080]/20 rounded-md'>

                    <Input
                        required
                        type="name"
                        name="name"
                        value={params?.name}
                        handleChange={handleChange}
                        label="Name"
                    />

                    <Input
                        required
                        type="url"
                        name="link"
                        value={params?.link}
                        handleChange={handleChange}
                        label="https://test.com"
                    />

                    <div className='flex flex-col gap-4 lg:col-span-2'>

                        {
                            params?.link !== '' ?
                                <div className='flex flex-col items-center'>
                                    <img
                                        src={base64}
                                        alt='qr-code-preview'
                                        className='w-52 h-52 object-contain'
                                    />

                                    <p className='lg:text-sm text-xs text-[#121212]'>Live QR Preview</p>

                                </div> :
                                <p className='lg:text-sm text-xs text-[#121212] text-center'>Add a valid link to see preview</p>
                        }

                    </div>

                </div>
                <div className='flex items-center justify-end gap-4 w-full'>
                    <SecondaryButton onClick={() => router.back()} type="button" width="w-fit" label="Cancel" />
                    <PrimaryButton type="submit" width="w-fit" label={id ? "Update" : "Submit"} />
                </div>
            </form>

        </div>
    )
}

export default Form