import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Section from '@/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { cn } from '@/lib/utils/cn'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://longevityicon.com/#naz',
        name: 'Naz',
        description: settings.data.site_meta_description || undefined,
      },
      {
        '@type': 'WebSite',
        '@id': 'https://longevityicon.com/#website',
        name: 'Longevity Icon',
        url: 'https://longevityicon.com',
      },
      {
        '@type': 'WebPage',
        '@id': `https://longevityicon.com${page.url}` || undefined,
        description:
          page.data.excerpt || page.data.meta_description || undefined,
        author: {
          '@id': 'https://longevityicon.com/#naz',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section
        className={cn('relative py-36 flex justify-center items-center', {
          'bg-color-neutral': prismic.isFilled.image(page.data.meta_image),
          'bg-color-primary': !prismic.isFilled.image(page.data.meta_image),
        })}
      >
        {prismic.isFilled.image(page.data.meta_image) && (
          <PrismicNextImage
            field={page.data.meta_image}
            fill
            sizes="45vw"
            className="absolute inset-0 object-cover opacity-20"
          />
        )}
        <div className="flex flex-col z-20 max-w-lg mx-auto">
          <PrismicRichText
            field={page.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading as="h1" size="5xl" className="text-color-base z-10">
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="text-xs z-10 text-color-base text-center">
            {page.first_publication_date}
          </p>
        </div>
      </Section>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${
      prismic.asText(page.data.title) || page.data.meta_title
    } • ${prismic.asText(settings.data.site_title)}`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('post')
  return pages.map(page => {
    return { uid: page.uid }
  })
}
