import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const side_menus = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard'
    },
    {
        name: 'Leads',
        link: '/admin/leads'
    },
    {
        name: 'QR',
        link: '/admin/qr'
    },
    {
        name: 'Profiles',
        link: '/admin/profiles'
    },
]


const Layout = ({ children }) => {

    const router = useRouter()
    const pathname = usePathname()

    const [mStates, setMStates] = useState({
        logout_options: {
            isOpen: false
        },
        settings: {
            isOpen: false
        }

    })

    const toggleOpenClose = (name) => {
        let temp = { ...mStates }
        temp[name].isOpen = !temp[name].isOpen
        setMStates(temp)
    }

    const toggleOpen = (name) => {
        let temp = { ...mStates }
        temp[name].isOpen = true
        setMStates(temp)
    }

    const toggleClose = (name) => {
        let temp = { ...mStates }
        temp[name].isOpen = true
        setMStates(temp)
    }


    const options = [
        {
            name: 'Logout',
            onClick: () => {
                router.push('/login')
            }
        },
        {
            name: 'Settings',
            onClick: () => {
                toggleOpen('settings')
            }
        },
    ]


    return (
        <div className='flex lg:flex-row items-start w-full h-screen'>

            <div className='flex flex-col flex-shrink-0 lg:w-60 w-20 px-4 bg-[#121212] h-full'>

                <div className='mt-12' />

                {side_menus?.map(({ name, link }) => (
                    <button onClick={() => router.push(link)} className={`${pathname.includes(link) ? 'bg-cyan-500 rounded' : ''} text-white p-2.5 text-sm  text-start w-full`}>
                        <p className='lg:block hidden'>{name}</p>
                        <p className='lg:hidden block text-center'>{name.slice(0,1)}</p>
                    </button>
                ))}

            </div>

            <div className='flex flex-col w-full overflow-y-auto h-full'>

                <div className='h-12 w-full bg-[#121212] px-4 flex flex-row items-center justify-end'>

                    <div className='relative min-w-32'>
                        <p onClick={() => toggleOpenClose('logout_options')} className='lg:text-sm text-xs cursor-pointer select-none text-white font-medium text-end w-full'>Hello, User</p>

                        {
                            mStates?.logout_options?.isOpen ?
                                <div className='w-full absolute top-12 right-0 bg-white shadow rounded-md overflow-hidden flex flex-col'>

                                    {
                                        options?.map(({ name, onClick }) => (
                                            <button onClick={onClick} className='p-2 text-sm hover:bg-cyan-50 border-b border-[#808080]/10'>
                                                {name}
                                            </button>
                                        ))
                                    }

                                </div> : ''
                        }
                    </div>

                </div>

                <div className='flex flex-col w-full h-full overflow-y-auto lg:p-6 p-4'>
                    {children}
                </div>

            </div>


        </div >
    )
}

export default Layout