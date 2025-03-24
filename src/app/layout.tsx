import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { Roboto, Roboto_Mono } from 'next/font/google'
import './globals.css'
import AppProvider from '@/components/app-provider'

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
        <AppProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
