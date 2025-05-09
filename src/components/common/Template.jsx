import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { showToastMessage } from '@/utils/toast';
import { IoMdContact } from "react-icons/io";
import { FaLinkedin } from 'react-icons/fa';

const Template = ({ width, height, params }) => {

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

    return (
        <div className={`${width || 'lg:w-80'} w-full mx-auto ${height || 'h-[550px]'} bg-[#121212] flex flex-col overflow-y-auto p-4 gap-4`}>

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

            <PrimaryButton label="Get in touch" />
            <SecondaryButton onClick={downloadVCard} width="w-full invert" label="Save Contact" />

        </div>
    )
}

export default Template