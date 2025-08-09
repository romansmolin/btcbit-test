'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { AuthenticationErrors, AuthenticationSteps } from '../consts/consts'
type UserType = 'member' | 'partner'

const enum USER_TYPE {
    'MEMBER' = 'member',
    'PARTNER' = 'partner',
}

const VALID_CREDENTIALS = {
    [USER_TYPE.MEMBER]: {
        email: 'member@valid.email',
        password: 'Member123!',
        otp: '151588',
    },
    [USER_TYPE.PARTNER]: {
        email: 'partner@valid.email',
        password: 'Partner123!',
        otp: '262699',
    },
}

export const signIn = async (formData: FormData) => {
    const email = formData.get('username') as string
    const password = formData.get('password') as string

    let userType: UserType | null = null

    // Check member credentials
    if (email === VALID_CREDENTIALS.member.email && password === VALID_CREDENTIALS.member.password) {
        userType = 'member'
    }
    // Check partner credentials
    else if (
        email === VALID_CREDENTIALS.partner.email &&
        password === VALID_CREDENTIALS.partner.password
    ) {
        userType = 'partner'
    }

    if (userType) {
        redirect(`/auth?step=${AuthenticationSteps.OTP}`)
    } else {
        redirect(`/auth?error=${AuthenticationErrors.WRONG_CREDENTIALS}`)
    }
}

export const sendOtp = async (formData: FormData) => {
    const otp = formData.get('otp') as string
    const cookiesStore = await cookies()

    if (VALID_CREDENTIALS[USER_TYPE.MEMBER].otp === otp) {
        cookiesStore.set('authenticated-user', USER_TYPE.MEMBER)
        redirect('/dashboard')
    }

    if (VALID_CREDENTIALS[USER_TYPE.PARTNER].otp === otp) {
        cookiesStore.set('authenticated-user', USER_TYPE.PARTNER)
        redirect('/dashboard')
    }
}
