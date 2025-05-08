import React, { Fragment } from 'react';
import Head from 'next/head';
import SecondaryButton from '../common/SecondaryButton';
import PrimaryButton from '../common/PrimaryButton';


const columns = [
  "id",
  "name",
  "phone",
  "email",
  "test_1",
  "test_2",
  "test_3",
  "test_4",
]


const Leads = () => {
  return (
    <div className='flex flex-col w-full gap-4'>

      <Head>
        <title>Leads</title>
      </Head>

      <div className='flex items-center justify-between w-full'>
        <h1 className='module-title'>Leads <span className=''>(100)</span></h1>

        <PrimaryButton width="w-fit" label="Export"/>
      </div>


      <div className='w-full overflow-x-auto rounded-md border border-[#808080]/20'>

        <div className='flex flex-row w-full flex-shrink-0'>

          {
            columns?.map((item) => (
              <div className='w-80 flex-shrink-0 bg-gray-200 p-4'>
                <p className='text-xs tracking-wider text-[#121212] uppercase font-medium'>{item}</p>
              </div>
            ))
          }

        </div>

        {
          [...Array(12)].map(item => (
            <div className='flex flex-row w-full flex-shrink-0'>
              <Fragment>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
                    <div className='w-80 flex-shrink-0 p-3 border-t border-[#808080]/20'>
                      <p className='text-sm text-[#121212]'>value_</p>
                    </div>
                  ))
                }
              </Fragment>
            </div>
          ))
        }


      </div>

    </div>
  )
}

export default Leads