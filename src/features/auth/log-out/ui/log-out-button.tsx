import { Button } from '@heroui/button'
import React from 'react'
import { DoorClosed } from 'lucide-react'

import { logOut } from '../service/log-out'

const LogOutButton = () => {
    return (
        <Button
            isIconOnly
            aria-label="Log out"
            color="primary"
            size="md"
            title="Log out"
            variant="bordered"
            onPress={logOut}
        >
            <DoorClosed aria-hidden="true" size={24} />
        </Button>
    )
}

export default LogOutButton
