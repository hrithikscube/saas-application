import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { FaLinkedin } from 'react-icons/fa';
import { IoIosCloseCircleOutline, IoMdContact } from "react-icons/io";
import SecondaryButton from './SecondaryButton'
import { showToastMessage } from '@/utils/toast';
import Input from './Input';
import { supabase } from '@/utils/supabase';

const Template = ({ width, height, params }) => {

    const initial_fields = {
        name: '',
        phone: '',
        email: '',
        source: ''
    }

    const [fields, setFields] = useState(initial_fields)

    const handleChange = (e) => {
        let { name, value } = e.target
        setFields({
            ...fields,
            [name]: value
        })
    }

    const [enquiryModal, setEnquiryModal] = useState(false)

    const openEnquiryModal = () => {
        setEnquiryModal(true)
    }

    const closeEnquiryModal = () => {
        setEnquiryModal(false)
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
            showToastMessage('Please enter valid information', 'error')
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { data, error } = await supabase
            .from('my-leads')
            .insert([
                { name: fields?.name, phone: fields?.phone, email: fields?.email, source: params?.name },
            ])
            .select()

        if (error) {
            showToastMessage(error?.message || 'Something went wrong', 'error')
            return
        }
        else {
            showToastMessage('Your response is captured', 'success')
            setFields(initial_fields)
            closeEnquiryModal()
        }

    }

    return (
        <div className={`${width || 'lg:w-80'} relative w-full mx-auto ${height || 'h-[550px]'} bg-[#121212] flex flex-col overflow-y-auto lg:p-6 p-4 gap-4`}>

            {
                enquiryModal ?
                    <div className='w-full h-full absolute bg-black/50 top-0 left-0 p-3 flex items-center justify-center'>

                        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full bg-white rounded-xl gap-4 px-5 py-6 relative z-[10]'>

                            <div onClick={closeEnquiryModal} className='absolute top-4 right-4 cursor-pointer'>
                                <IoIosCloseCircleOutline className='w-5 h-5' />
                            </div>

                            <h1 className='lg:text-lg text-base font-semibold'>Get in Touch</h1>

                            <Input
                                required
                                name="name"
                                value={fields?.name}
                                handleChange={handleChange}
                                label="Name"
                            />

                            <Input
                                type="number"
                                required
                                name="phone"
                                value={fields?.phone}
                                handleChange={handleChange}
                                label="Phone"
                            />

                            <Input
                                type="email"
                                required
                                name="email"
                                value={fields?.email}
                                handleChange={handleChange}
                                label="Email"
                            />

                            <PrimaryButton type="submit" label="Submit" />
                        </form>

                    </div> : ''
            }

            <div>
                <h2 className='lg:text-lg text-base text-white font-semibold'>{params?.name || "Name"}</h2>

                <p className='text-sm text-white font-medium'>{params?.designation || 'Designation'}</p>

                <h2 className='lg:text-2xl text-xl font-bold text-white'>LOGO</h2>

            </div>

            <div className='flex flex-col p-4 bg-white rounded-lg'>

                <div className='flex flex-row items-center gap-2 pb-2 border-b border-[#808080]/20'>

                    <div>
                        <IoMdContact className='w-8 h-8' />
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

                <div className='flex flex-row items-center gap-2'>

                    <div>
                        <FaLinkedin className='w-8 h-8' />
                    </div>

                    <h3 className='lg:text-base text-sm font-semibold'>Linkedin</h3>

                </div>

            </div>

            <PrimaryButton type="button" onClick={openEnquiryModal} label="Get in touch" />
            <SecondaryButton type="button" onClick={downloadVCard} width="w-full invert" label="Save Contact" />

        </div>
    )
}

export default Template