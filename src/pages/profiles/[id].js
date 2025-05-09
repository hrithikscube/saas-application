import React from 'react';
import { useRouter } from 'next/router';
import Template from '@/components/common/Template';
import ProfileLanding from '@/components/modules/Profiles/ProfileLanding';

const ProfileTemplate = () => {
    const router = useRouter()
    let { id } = router.query

    return (
        <ProfileLanding id={id} />
    )
}

export default ProfileTemplate