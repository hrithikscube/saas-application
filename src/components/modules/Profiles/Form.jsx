import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Input from '@/components/common/Input';
import { showToastMessage } from '@/utils/toast';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import Template from '@/components/common/Template';

const initial_states = {
    name: '',
    phone: '',
    email: '',
    designation: '',
    linkedin: ''
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


    // function downloadVCard() {
    //     if (params?.name !== '' && params?.phone !== '' && params?.email !== '') {
    //         const vCardData = [
    //             'BEGIN:VCARD',
    //             'VERSION:3.0',
    //             `FN:${params?.name || ''}`,
    //             `N:${params?.name?.split(' ').reverse().join(';') || ';;;'}`, // surname;given;middle;prefix;suffix
    //             `EMAIL:${params?.email || ''}`,
    //             `TEL;TYPE=CELL:${params?.phone || ''}`,
    //             'END:VCARD'
    //         ].join('\r\n');

    //         const blob = new Blob([vCardData], { type: 'text/vcard' });
    //         const url = URL.createObjectURL(blob);

    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'contact.vcf';
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         URL.revokeObjectURL(url);
    //     }
    //     else {
    //         alert('Please enter valid information')
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (id) {
            const { data, error } = await supabase
                .from('my-profiles')
                .update([
                    {
                        name: params?.name,
                        phone: params?.phone,
                        email: params?.email,
                        designation: params?.designation,
                        linkedin: params?.linkedin,
                    },
                ])
                .eq('id', id)
                .select()

            if (error) {
                showToastMessage(error?.message || 'Something went wrong', 'error')
                return
            }
            else {
                showToastMessage('Profile updated succesfully', 'success')
                setParams(initial_states)
                router.push('/admin/profiles')
            }
        }
        else {
            const { data, error } = await supabase
                .from('my-profiles')
                .insert([
                    {
                        name: params?.name,
                        phone: params?.phone,
                        email: params?.email,
                        designation: params?.designation,
                        linkedin: params?.linkedin,
                    },
                ])
                .select()

            if (error) {
                showToastMessage(error?.message || 'Something went wrong', 'error')
                return
            }
            else {
                showToastMessage('Profile was created succesfully', 'success')
                setParams(initial_states)
                router.push('/admin/profiles')
            }
        }

    }

    const getProfileById = async () => {
        let { data, error } = await supabase
            .from('my-profiles')
            .select("*")
            .eq('id', id)
            .single();

        if (data) {
            setParams({
                name: data?.name,
                phone: data?.phone,
                email: data?.email,
                designation: data?.designation,
                linkedin: data?.linkedin,
            })
        }
    }

    useEffect(() => {
        if (typeof id !== 'undefined') {
            getProfileById()
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


            <div className='flex flex-col gap-4'>
                <div className='grid lg:grid-cols-2 items-start gap-4 w-full lg:p-6 p-4 bg-white border border-[#808080]/20 rounded-md'>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>

                        <h2 className='lg:text-base text-sm text-[#121212] font-medium'>Basic Information</h2>

                        <Input
                            required
                            type="text"
                            name="name"
                            value={params?.name}
                            handleChange={handleChange}
                            label="Name"
                        />

                        <Input
                            required
                            type="number"
                            name="phone"
                            value={params?.phone}
                            handleChange={handleChange}
                            label="Phone"
                        />

                        <Input
                            required
                            type="email"
                            name="email"
                            value={params?.email}
                            handleChange={handleChange}
                            label="Email"
                        />

                        <Input
                            required
                            type="text"
                            name="designation"
                            value={params?.designation}
                            handleChange={handleChange}
                            label="Designation"
                        />

                        <Input
                            required
                            type="url"
                            name="linkedin"
                            value={params?.linkedin}
                            handleChange={handleChange}
                            label="Linkedin"
                        />

                        <div className='flex items-center justify-end gap-4 w-full'>
                            <SecondaryButton onClick={() => router.back()} type="button" width="w-fit" label="Cancel" />
                            <PrimaryButton type="submit" width="w-fit" label={id ? "Update" : "Submit"} />
                        </div>

                    </form>

                    <div className='flex flex-col w-full gap-4 items-center'>

                        <h2 className='lg:text-base text-sm text-[#121212] font-medium'>Preview</h2>

                        <Template params={params} height="h-[550px]" />

                        <p onClick={() => router.push(`/profiles/${id}`)} className='lg:text-sm font-medium text-xs text-blue-500 hover:underline cursor-pointer select-none'>View</p>

                    </div>

                </div>


            </div>

        </div>
    )
}

export default Form