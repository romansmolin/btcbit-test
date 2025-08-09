'use client'

import React from 'react'
import { Button } from '@heroui/button'
import Link from 'next/link'
import { ArrowBigDownIcon, ArrowBigUpIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { BalanceSort } from '@/entities/balance'

interface SortBalancesButtonProps {
    sortOrder: BalanceSort
    sortBy: string
}

const SortBalancesButton: React.FC<SortBalancesButtonProps> = ({ sortOrder, sortBy }) => {
    const pathname = usePathname()

    return (
        <Button
            isIconOnly
            aria-label={`Sort by ${sortBy} ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            as={Link}
            color="primary"
            href={{
                pathname,
                query: { sortBy, sortOrder },
            }}
            size="lg"
            variant="bordered"
        >
            {sortOrder === 'asc' ? <ArrowBigDownIcon size={24} /> : <ArrowBigUpIcon size={24} />}
        </Button>
    )
}

export default SortBalancesButton
