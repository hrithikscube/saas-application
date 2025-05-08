import { useRouter } from 'next/router';
import Input from '@/components/common/Input';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';

const initial_states = {
  name: '',
  link: ''
}

const initial_errors = {
  name: '',
  link: ''
}

const CreateNewQr = () => {
  const router = useRouter()
  const [params, setParams] = useState(initial_states)

  const handleChange = (e) => {
    let { name, value } = e.target
    setParams({
      ...params,
      [name]: value
    })
  }

  const [base64, setBase64] = useState('')

  useEffect(() => {
    if (params?.link !== '') {
      fetch('/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: params?.link || 'https://test.com' }),

      })
        .then((response) => response.json())
        .then((data) => setBase64(data.base64))
        .catch((error) => console.error(error))
    }
  }, [params?.link])

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/admin/qr')
  }

  return (
    <div className='flex flex-col w-full gap-4'>

      <div className='p-3 bg-slate-300 w-full rounded-md'>
        <h1 className='lg:text-base text-sm font-semibold text-[#121212]'>Create New QR</h1>
      </div>


      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='grid lg:grid-cols-2 items-start gap-4 w-full p-4 bg-white border border-[#808080]/20 rounded-md'>

          <Input
            required
            type="name"
            name="name"
            value={params?.name}
            handleChange={handleChange}
            label="Name"
          />

          <Input
            required
            type="url"
            name="link"
            value={params?.link}
            handleChange={handleChange}
            label="https://test.com"
          />

          <div className='flex flex-col gap-4 lg:col-span-2'>

            {
              params?.link !== '' ?
                <div className='flex flex-col items-center'>
                  <img
                    src={base64}
                    alt='qr-code-preview'
                    className='w-52 h-52 object-contain'
                  />

                  <p className='lg:text-sm text-xs text-[#121212]'>Live QR Preview</p>

                </div> :
                <p className='lg:text-sm text-xs text-[#121212] text-center'>Add a valid link to see preview</p>
            }

          </div>

        </div>
        <div className='flex items-center justify-end gap-4 w-full'>
          <SecondaryButton onClick={()=>router.back()} type="button" width="w-fit" label="Cancel" />
          <PrimaryButton type="submit" width="w-fit" label="Submit" />
        </div>
      </form>

    </div>
  )
}

export default CreateNewQr