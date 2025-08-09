import { Form } from '@heroui/form'
import React from 'react'
import { InputOtp } from '@heroui/input-otp'
import { KeyRoundIcon } from 'lucide-react'
import { Button } from '@heroui/button'

import { sendOtp } from '../actions/sign-in'

const SignInOtpForm = () => {
    return (
        <Form action={sendOtp} className="w-full">
            <InputOtp
                isRequired
                aria-label="OTP input field"
                className="mx-auto"
                length={6}
                name="otp"
            />
            <Button
                fullWidth
                aria-label="Submit OTP button"
                color="primary"
                type="submit"
                variant="bordered"
            >
                <KeyRoundIcon size={20} />
                Submit
            </Button>
        </Form>
    )
}

export default SignInOtpForm
