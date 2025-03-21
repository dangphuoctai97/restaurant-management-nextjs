import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Roboto, Roboto_Mono } from 'next/font/google'
import './globals.css'

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin']
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Phước Tài Dev',
  description: 'Amazing Next App'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
