import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';
import ModuleLoader from '../../common/ModuleLoader';
import PrimaryButton from '../../common/PrimaryButton';
import React, { Fragment, useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import ChatModal from './ChatModal';

const columns = [
  "id",
  "full_name",
  "email",
  "role",
  "created_at",
  "action"
]

const MyUsers = () => {

  const router = useRouter()
  const [usersList, setUsersList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllLeads = async () => {
    setIsLoading(true)
    let { data } = await supabase.from('my-users').select('*')
    setUsersList(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  const [mStates, setMStates] = useState({
    open_chat: {
      id: null,
      isOpen: false,
    }
  })

  const toggleOpen = (name, data) => {
    let temp = { ...mStates }
    temp[name].id = data?.id
    temp[name].isOpen = true
    setMStates(temp)
  }

  const toggleClose = (name) => {
    let temp = { ...mStates }
    temp[name].isOpen = false
    temp[name].id = null
    setMStates(temp)
  }

  useEffect(() => {
    getAllLeads()
  }, [])

  return (
    <div className='flex flex-col w-full gap-4'>

      <Head>
        <title>My Users</title>
      </Head>

      <div className='flex items-center justify-between w-full'>
        <h1 className='module-title'>My Users <span className='count-text'>({usersList?.length})</span></h1>

        <PrimaryButton width="w-fit" label="Export" />
      </div>

      {
        isLoading ?
          <ModuleLoader />
          :
          <Fragment>
            {
              usersList?.length > 0 ?
                <div className='w-full overflow-x-auto rounded-md border border-[#808080]/20'>

                  <div className='flex flex-row w-full flex-shrink-0'>

                    {
                      columns?.map((item) => (
                        <div className='w-80 flex-shrink-0 bg-gray-200 p-4'>
                          <p className='text-xs text-[#121212] uppercase font-medium'>{item}</p>
                        </div>
                      ))
                    }

                  </div>

                  {
                    usersList.map(userItem => (
                      <div className='flex flex-row w-full flex-shrink-0'>
                        <Fragment>
                          {
                            columns?.map((col) => (
                              <Fragment>
                                {col !== 'action' ?
                                  <div className='w-80 flex-shrink-0 p-3 border-t border-[#808080]/20'>
                                    <p className='text-sm text-[#121212]'>{col !== 'created_at' ? userItem[col] : moment(userItem[col]).format('DD/MM/YYYY')}</p>
                                  </div> :
                                  <div className='w-80 flex-shrink-0 p-3 border-t border-[#808080]/20'>
                                    <FaEye onClick={() => toggleOpen('open_chat', userItem)} className='w-4 h-4 cursor-pointer' />
                                  </div>
                                }
                              </Fragment>
                            ))
                          }
                        </Fragment>
                      </div>
                    ))
                  }


                </div> :
                <p className='text-center lg:text-base text-sm'>No Records Found!</p>
            }
          </Fragment>
      }


      <ChatModal
        usersList={usersList}
        id={mStates?.open_chat?.id}
        open={mStates?.open_chat?.isOpen}
        handleClose={() => toggleClose('open_chat')} />

    </div>
  )
}

export default MyUsers