import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import EditProfile from '@/components/modules/Profiles/EditProfile';

const EditProfileModule = () => {

    const router = useRouter()
    let { id } = router.query

    return (
        <Layout>
            <EditProfile id={id} />
        </Layout>
    )
}

export default EditProfileModule