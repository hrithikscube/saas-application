import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import EditQr from '@/components/modules/Qr/EditQr';

const EditQrModule = () => {

    const router = useRouter()
    let { id } = router.query

    return (
        <Layout>
            <EditQr id={id} />
        </Layout>
    )
}

export default EditQrModule