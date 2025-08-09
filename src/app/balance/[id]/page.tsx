import React, { Suspense } from 'react'

import LoadingIndicator from '@/shared/ui/loading-indicator'
import { BalanceDetailsPage } from '@/views/balance-details-page'

interface BalanceDetailsProps {
    params: { id: string }
}

export default async function BalanceDetails({ params }: BalanceDetailsProps) {
    const balanceId = Number(params.id)

    return (
        <Suspense fallback={<LoadingIndicator fullHeight />}>
            <BalanceDetailsPage balanceId={balanceId} />
        </Suspense>
    )
}
