import React from 'react'

import { AuthenticationErrors, AuthenticationSteps } from '@/features/auth/sign-in/consts/consts'
import { AuthenticationPage } from '@/views/auth-page'

interface AuthenticationProps {
    searchParams: Promise<{
        step: AuthenticationSteps
        error: AuthenticationErrors
    }>
}

const Authentication: React.FC<AuthenticationProps> = async ({ searchParams }) => {
    const { step, error } = await searchParams

    return <AuthenticationPage error={error} step={step} />
}

export default Authentication
