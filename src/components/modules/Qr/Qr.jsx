import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';
import PrimaryButton from '../../common/PrimaryButton';
import moment from 'moment';

const columns = [
  "id",
  "name",
  "link",
  "created_at",
]

const Qr = () => {
  const router = useRouter()
  const [qrList, setQrList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllQrs = async () => {
    setIsLoading(true)
    let { data } = await supabase.from('my-qr').select('*')
    setQrList(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  useEffect(() => {
    getAllQrs()
  }, [])

  return (
    <div className='flex flex-col w-full gap-4'>

      <Head>
        <title>QR</title>
      </Head>

      <div className='flex items-center justify-between w-full'>
        <h1 className='module-title'>QR <span className='count-text'>({qrList?.length})</span></h1>

        <PrimaryButton onClick={() => router.push('/admin/qr/create')} width="w-fit" label="Create New QR" />
      </div>

      {
        isLoading?
        <p className='text-center lg:text-base text-sm'>Loading...</p>
        :
        <Fragment>
        {
          qrList?.length > 0 ?
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
                qrList.map(qrItem => (
                  <div className='flex flex-row w-full flex-shrink-0'>
                    <Fragment>
                      {
                        columns?.map((col) => (
                          <div className='w-80 flex-shrink-0 p-3 border-t border-[#808080]/20'>
                            <p className='text-sm text-[#121212]'>{col !== 'created_at' ? qrItem[col] : moment(qrItem[col]).format('DD/MM/YYYY')}</p>
                          </div>
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

export default Qr