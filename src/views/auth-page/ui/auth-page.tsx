import { Smile } from 'lucide-react'
import React from 'react'
import { Alert } from '@heroui/alert'

import { AuthenticationErrors, AuthenticationSteps } from '@/features/auth/sign-in/consts/consts'
import { SignInForm, SignInOtpForm } from '@/features/auth'

interface AuthenticationPageProps {
    error: AuthenticationErrors
    step: AuthenticationSteps
}

const authenticationSteps = {
    default: <SignInForm />,
    [AuthenticationSteps.OTP]: <SignInOtpForm />,
} as const

const authenticationFormTitle = {
    default: 'If you want to continue your experience, please log in.',
    [AuthenticationSteps.OTP]: 'Please enter the OTP code, you received.',
} as const

const AuthenticationPage: React.FC<AuthenticationPageProps> = ({ step, error }) => {
    return (
        <section className="h-full flex flex-col gap-5 justify-center items-center min-w-80 sm:min-w-96 mx-auto">
            {error && (
                <div>
                    <Alert
                        color="danger"
                        description={'Either password or email is wrong!'}
                        title={'Authentication error!'}
                    />
                </div>
            )}
            <div className=" rounded-xl border-2 p-8 space-y-6 border-primary">
                <div className="flex flex-col justify-center items-center gap-3 text-primary">
                    <Smile aria-hidden="true" size={72} />
                    <p className="text-center">
                        {step ? authenticationFormTitle[step] : authenticationFormTitle.default}
                    </p>
                </div>
                {step ? authenticationSteps[step] : authenticationSteps.default}
            </div>
        </section>
    )
}

export default AuthenticationPage
