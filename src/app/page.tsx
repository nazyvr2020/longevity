import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import { components } from '@/slices'
import { Graph } from 'schema-dts'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://${settings.data.domain}/#naz`,
        name: 'Naz',
        description: settings.data.site_meta_description || '',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')
  return {
    title: `${page.data.meta_title} • ${prismic.asText(
      settings.data.site_title,
    )}`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
  }
}
