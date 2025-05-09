import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Input from '@/components/common/Input';
import { showToastMessage } from '@/utils/toast';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';

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


    function downloadVCard() {
        if (params?.name !== '' && params?.phone !== '' && params?.email !== '') {
            const vCardData = [
                'BEGIN:VCARD',
                'VERSION:3.0',
                `FN:${params?.name || ''}`,
                `N:${params?.name?.split(' ').reverse().join(';') || ';;;'}`, // surname;given;middle;prefix;suffix
                `EMAIL:${params?.email || ''}`,
                `TEL;TYPE=CELL:${params?.phone || ''}`,
                'END:VCARD'
            ].join('\r\n');

            const blob = new Blob([vCardData], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'contact.vcf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        else {
            alert('Please enter valid information')
        }
    }

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


            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid lg:grid-cols-2 items-start gap-4 w-full lg:p-6 p-4 bg-white border border-[#808080]/20 rounded-md'>

                    <div className='flex flex-col gap-4 w-full'>

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
                    </div>


                    <div className='flex flex-col w-full gap-4 items-center'>

                        <h2 className='lg:text-base text-sm text-[#121212] font-medium'>Preview</h2>

                        <div className='lg:w-80 w-full mx-auto h-[550px] bg-[#121212] flex flex-col overflow-y-auto p-4 gap-4'>

                            <div>
                                <h2 className='lg:text-lg text-base text-white font-semibold'>{params?.name || "Name"}</h2>

                                <p className='text-sm text-white font-medium'>{params?.designation || 'Designation'}</p>

                                <h2 className='lg:text-2xl text-xl font-bold text-white'>SOME <br /> COMPANY LOGO</h2>

                            </div>

                            <div className='flex flex-col p-4 bg-white rounded-lg'>

                                <div className='flex flex-row items-center gap-4 pb-2 border-b border-[#808080]/20'>

                                    <div>
                                        <div className='w-10 h-10 bg-black rounded-full' />
                                    </div>

                                    <h3 className='lg:text-base text-sm font-semibold'>Contact Me</h3>

                                </div>

                                <div className='flex flex-col gap-2 pt-2'>

                                    <div className=''>
                                        <p className='text-sm text-[#121212] font-medium'>Phone</p>
                                        <p className='text-sm text-[#808080] font-medium'>{params?.phone || '9123456789'}</p>
                                    </div>

                                    <div className=''>
                                        <p className='text-sm text-[#121212] font-medium'>Email</p>
                                        <p className='text-sm text-[#808080] font-medium'>{params?.email || 'test@example.com'}</p>
                                    </div>

                                </div>

                            </div>


                            <div className='flex flex-col p-4 bg-white rounded-lg'>

                                <div className='flex flex-row items-center gap-4'>

                                    <div>
                                        <div className='w-10 h-10 bg-black rounded' />
                                    </div>

                                    <h3 className='lg:text-base text-sm font-semibold'>Linkedin</h3>

                                </div>

                            </div>

                            <PrimaryButton label="Get in touch" />
                            <SecondaryButton onClick={downloadVCard} width="w-full invert" label="Save Contact" />

                        </div>

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