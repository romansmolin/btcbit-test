import { Card, CardBody, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import Link from 'next/link'
import React from 'react'

import { getProcessedBalance } from '@/entities/balance'

const BalanceDetailsPage = async ({ balanceId }: { balanceId: number }) => {
    const balance = await getProcessedBalance(balanceId)

    return (
        <div className="h-full flex justify-center items-center">
            <Card className="w-full max-w-2xl border-2 border-primary shadow-lg">
                <CardHeader className="flex items-center justify-between gap-3 px-6 py-5 bg-primary/5">
                    <div className="flex flex-col">
                        <span className="text-sm text-default-500">Balance ID</span>
                        <span className="text-xl font-semibold text-primary">{balance.id}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-default-500">Currency</span>
                        <div className="text-lg font-bold text-primary">
                            {balance.code} <span className="text-default-500">({balance.symbol})</span>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-6 py-8">
                    <div className="space-y-6">
                        <div>
                            <span className="block text-sm text-default-500 mb-1">Amount</span>
                            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">
                                {balance.amount}{' '}
                                <span className="text-default-600">{balance.symbol}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-lg border border-primary p-4">
                                <div className="text-xs text-default-500">Currency ID</div>
                                <div className="text-base font-medium text-primary">
                                    {balance.currency_id}
                                </div>
                            </div>
                            <div className="rounded-lg border border-primary p-4">
                                <div className="text-xs text-default-500">Code</div>
                                <div className="text-base font-medium text-primary">{balance.code}</div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button as={Link} color="primary" href="/dashboard" variant="bordered">
                                Back to Dashboard
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default BalanceDetailsPage
