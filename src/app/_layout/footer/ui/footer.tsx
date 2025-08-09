import { Landmark } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="container mx-auto p-5 rounded-xl border-2 flex justify-between items-center border-primary">
            <div className="flex gap-2 items-center text-primary">
                <Landmark aria-hidden="true" size={28} />
                <span className="font-bold italic text-xl">EasyCrypto</span>
            </div>

            <span className="font-bold text-sm text-primary">BtcBit Test Task 2025</span>
        </footer>
    )
}

export default Footer
