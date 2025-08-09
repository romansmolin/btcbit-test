'use client'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const BalancesFilter = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleSearch = () => {
        const url = `${pathname}/?search=${encodeURIComponent(search)}`

        router.push(url)
    }

    return (
        <div className="flex gap-2 max-w-[400px]">
            <Input
                aria-label="Search balances"
                color="primary"
                placeholder="Search"
                size={'lg'}
                value={search}
                variant="bordered"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSearch()
                    }
                }}
            />
            <Button
                isIconOnly
                aria-controls="balances-grid"
                aria-label="Search balances"
                color="primary"
                size="lg"
                title="Search"
                variant="bordered"
                onPress={handleSearch}
            >
                <SearchIcon size={24} />
            </Button>
        </div>
    )
}

export default BalancesFilter
