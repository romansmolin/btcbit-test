import React from 'react'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { KeyRoundIcon } from 'lucide-react'

import { signIn } from '../actions/sign-in'

const SignInForm = () => {
    return (
        <Form action={signIn} className="space-y-3 w-full">
            <Input
                isRequired
                aria-label="Email input field"
                errorMessage="Please enter a valid email"
                label="Username"
                name="username"
                type="email"
            />
            <Input
                isRequired
                aria-label="Password input field"
                errorMessage="Please enter a valid password"
                label="Password"
                name="password"
                type="password"
            />
            <Button
                fullWidth
                aria-label="Submit sign-in button"
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

export default SignInForm
