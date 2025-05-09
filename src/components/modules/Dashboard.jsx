import React from 'react';
import Head from 'next/head';


const stats = [
  {
    name: 'Profiles',
    value: '10'
  },
  {
    name: 'QR Codes',
    value: '20'
  },
  {
    name: 'Leads',
    value: '50'
  }
]

const Dashboard = () => {
  return (
    <div>

      <Head>
        <title>
          Dashboard
        </title>
      </Head>

      <div className='flex flex-col w-full gap-4'>

        <h1 className='module-title'>Welcome back, User</h1>

        <div className='w-full flex lg:flex-row flex-col overflow-x-auto pb-4'>

          {
            stats?.map(({ name, value }) => (
              <div className='py-2 px-2.5 w-1/3 flex-shrink-0 h-60'>
                <div className='w-full h-full flex-shrink-0 bg-white flex flex-col justify-between lg:rounded-2xl rounded-lg lg:p-6 p-4'>
                  <h2 className='lg:text-base text-sm font-semibold'>{name}</h2>
                  
                  <h3 className='lg:text-2xl text-xl font-bold'>{value}</h3>
                </div>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Dashboard