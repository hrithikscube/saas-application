import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import PrimaryButton from '../../common/PrimaryButton';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';
import moment from 'moment';
import ModuleLoader from '@/components/common/ModuleLoader';
import { FaEdit } from 'react-icons/fa';

const columns = [
  "id",
  "name",
  "phone",
  "email",
  "designation",
  "linkedin",
  "created_at",
  "action"
]

const Profiles = () => {

  const router = useRouter()
  const [profilesList, setProfilesList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const getAllProfiles = async () => {
    setIsLoading(true)
    let { data } = await supabase.from('my-profiles').select('*')
    setProfilesList(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  useEffect(() => {
    getAllProfiles()
  }, [])

  return (
    <div className='flex flex-col w-full gap-4'>

      <Head>
        <title>Profiles</title>
      </Head>

      <div className='flex items-center justify-between w-full'>
        <h1 className='module-title'>Profiles <span className='count-text'>({profilesList?.length})</span></h1>

        <PrimaryButton onClick={() => router.push('/admin/profiles/create')} width="w-fit" label="Create Profile" />
      </div>

      {
        isLoading ?
          <ModuleLoader />
          :

          <Fragment>
            {
              profilesList?.length > 0 ?
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
                    profilesList.map((profileItem) => (
                      <div className='flex flex-row w-full flex-shrink-0'>
                        <Fragment>
                          {
                            columns?.map((col) => (
                              <Fragment>
                                {col !== 'action' ?
                                  <div className='w-80 flex-shrink-0 p-3 border-t border-[#808080]/20'>
                                    <p className='text-sm text-[#121212]'>{col !== 'created_at' ? profileItem[col] : moment(profileItem[col]).format('DD/MM/YYYY')}</p>
                                  </div> :
                                  <div className='w-80 flex-shrink-0 p-3 border-t border-[#808080]/20 flex items-center gap-4'>
                                    <FaEdit onClick={() => router.push(`/admin/profiles/edit/${profileItem['id']}`)} className='w-4 h-4 cursor-pointer' />
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




    </div>
  )
}

export default Profiles