import SessionProvider from './sessionprovider'
import { Providers } from '@/lib/providers'
import './styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className + "p-6"}>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange

          >

              {props.children}
          </ThemeProvider>
          </body >
      </html>
    </Providers>
  )
    
}
