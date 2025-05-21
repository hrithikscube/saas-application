import Input from '@/components/common/Input';
import React, { Fragment, useEffect, useState } from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';
import { IoIosArrowRoundBack, IoIosCloseCircleOutline } from 'react-icons/io';
import { supabase } from '@/utils/supabase';
import { showToastMessage } from '@/utils/toast';

const ChatModal = ({ id, open, usersList, handleClose }) => {

    const [activeDetails, setActiveDetails] = useState({})

    const initial_states = {
        content: ''
    }

    const [conversations, setConversations] = useState([])

    const [params, setParams] = useState(initial_states)

    const handleChange = (e) => {
        let { name, value } = e.target
        setParams({
            ...params,
            [name]: value
        })
    }

    // const [activeScreen, setActiveScreen] = useState('all_conversations')

    const onCloseClick = () => {
        setActiveDetails({})
        setParams(initial_states)
        handleClose()
    }

    const getConversations = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', '1'); // Replace '1' with the actual UUID string

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            console.log('Messages:', data);
            setConversations(data)
        }
    };

    useEffect(() => {
        if (open && JSON.stringify(activeDetails) !== '{}') {
            // Initial fetch
            getConversations()

            // Subscribe to realtime messages
            const channel = supabase
                .channel('realtime-messages')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'messages',
                        filter: `conversation_id=eq.${'1'}`,
                    },
                    (payload) => {
                        console.log('Realtime message received:', payload)

                        if (payload.eventType === 'INSERT') {
                            setConversations((prev) => [...prev, payload.new])
                        }

                        // Optionally handle UPDATE and DELETE
                    }
                )
                .subscribe()

            // Cleanup on unmount
            return () => {
                supabase.removeChannel(channel)
            }
        }
    }, [open, activeDetails])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase
            .from('messages')
            .insert([
                { conversation_id: '1', sender_id: id, content: params?.content },
            ])
            .select()

        if (error) {
            showToastMessage(error?.message || 'Something went wrong', 'error')
            return
        }
        else {
            // getConversations()
            setParams(initial_states)
        }

    }

    // useEffect(() => {
    //     if (open && JSON.stringify(activeDetails) !== '{}') {
    //         getConversations()
    //     }
    // }, [open, activeDetails])

    if (!open) {
        return
    }

    if (JSON.stringify(activeDetails) !== '{}') {
        return (
            <div className='w-full h-full absolute bg-black/20 top-0 left-0 flex items-center justify-center p-4'>

                <div className='lg:w-96 w-full mx-auto bg-white flex flex-col'>
                    <div className='p-4 bg-cyan-600 flex items-center justify-between'>

                        <div className='flex items-center gap-2'>
                            <IoIosArrowRoundBack onClick={() => setActiveDetails({})} className='invert w-6 h-6 cursor-pointer' />

                            <h1 className='lg:text-lg text-base font-medium  text-white'>{activeDetails?.full_name}</h1>
                        </div>

                        <IoIosCloseCircleOutline onClick={onCloseClick} className='invert w-6 h-6 cursor-pointer' />

                    </div>

                    <div className='flex flex-col p-4 gap-4'>
                        <div className='h-60 w-full flex flex-col gap-4 overflow-y-auto'>

                            {conversations?.map((item, index) => (
                                <div className={`p-4 w-8/12 ${id !== item?.sender_id ? 'bg-slate-200 mr-auto rounded-b-md rounded-tr-md' : 'bg-amber-100 ml-auto rounded-b-md rounded-tl-md'}`}>
                                    <p className='text-sm text-[#121212]'>{item?.content}</p>
                                </div>
                            ))}

                        </div>

                        <form onSubmit={handleSubmit} className='w-full flex items-center gap-4'>

                            <Input
                                required
                                name="content"
                                value={params?.content}
                                handleChange={handleChange}
                                label="Enter message"
                            />

                            <PrimaryButton type="submit" width="w-fit" label="Send" />

                        </form>
                    </div>

                </div>

            </div>
        )
    }

    return (
        <div className='w-full h-full absolute bg-black/20 top-0 left-0 flex items-center justify-center p-4'>
            <div className='lg:w-96 w-full mx-auto bg-white flex flex-col'>

                <div className='p-4 bg-cyan-600 flex items-center justify-between gap-2 relative'>
                    <h1 className='lg:text-lg text-base font-medium  text-white'>All Conversations</h1>

                    <IoIosCloseCircleOutline onClick={onCloseClick} className='invert w-6 h-6 cursor-pointer' />
                </div>

                <div className='flex flex-col w-full h-80 overflow-y-auto divide-y divide-[#808080]/50'>
                    {
                        usersList?.map((item, index) => (
                            <Fragment>
                                {
                                    id !== item?.id ?
                                        <div onClick={() => {
                                            setActiveDetails(item)
                                        }} className='flex items-center gap-2 p-4 select-none cursor-pointer hover:bg-[#f2f2f2] border-b last:border-[#808080]/50'>

                                            <div>
                                                <div className='w-10 h-10 bg-slate-300 rounded-full' />
                                            </div>

                                            <h2 className='lg:text-base text-sm'>{item?.full_name}</h2>

                                        </div> : ''
                                }
                            </Fragment>
                        ))
                    }
                </div>


            </div>

        </div>
    )
}

export default ChatModal