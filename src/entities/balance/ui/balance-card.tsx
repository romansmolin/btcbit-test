import React from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import Link from 'next/link'

import { IProcessedBalance } from '../model/balance.type'

interface BalanceCardProps {
    balance: IProcessedBalance
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
    return (
        <Link aria-label={`View details for ${balance.code} balance`} href={`/balance/${balance.id}`}>
            <Card className="max-w-[400px] border border-primary">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-primary">{balance.code}</p>
                        <p className="text-small text-default-500">
                            {' '}
                            Currency ID: {balance.currency_id}
                        </p>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="text-xl text-primary">
                        {balance.amount} {balance.symbol}
                    </p>
                </CardBody>
            </Card>
        </Link>
    )
}

export default BalanceCard
