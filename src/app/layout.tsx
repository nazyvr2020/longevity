import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { clsx } from 'clsx'
import { PrismicPreview } from '@prismicio/next'
import { createClient, repositoryName } from '@/prismicio'
import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

/**
 * Heading & Body fonts
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

/**
 * fetch and generate Metadata
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL('https://www.longevityicon.com'),
    title: prismic.asText(settings.data.site_title) || 'Longevity Icon',
    description:
      settings.data.site_meta_description ||
      `I invite you to join me on an exciting journey of longevity where I incorporate science based principles to empower you in making informed decisions about your health.`,
    openGraph: {
      images: [settings.data.site_meta_image.url || ''],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <body
        className={clsx(
          montserrat.variable,
          openSans.variable,
          `font-opensans text-color-neutral`
        )}
      >
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
