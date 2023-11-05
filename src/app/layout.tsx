import type { Metadata } from 'next'
import { Saira } from 'next/font/google'
import './globals.css'

import { isMobile } from 'react-device-detect'


const inter = Saira({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insight Project',
  description: 'By Dafazan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {children}


      </body>
    </html>
  )
}
