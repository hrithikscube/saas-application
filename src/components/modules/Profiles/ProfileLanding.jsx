import { supabase } from '@/utils/supabase';
import React, { useEffect, useState } from 'react';
import Template from '@/components/common/Template';

const ProfileLanding = ({ id }) => {

  const initial_states = {
    name: '',
    phone: '',
    email: '',
    designation: '',
    linkedin: '',
  }

  const [params, setParams] = useState(initial_states)

  const getProfileById = async () => {
    let { data, error } = await supabase
      .from('my-profiles')
      .select("*")
      .eq('id', id)
      .single();

    if (data) {
      setParams({
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        designation: data?.designation,
        linkedin: data?.linkedin,
      })
    }
  }

  useEffect(() => {
    if (typeof id !== 'undefined') {
      getProfileById()
    }
  }, [id])

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <Template params={params} width="lg:w-96" height="h-full" />
    </div>
  )
}

export default ProfileLanding