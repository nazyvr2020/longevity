import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Section from '@/components/Section'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { cn } from '@/lib/utils/cn'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')
  let pubDate
  page.data.date_published
    ? (pubDate = new Date(page.data.date_published).toLocaleDateString(
        'en-CA',
        {
          weekday: 'long',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'UTC',
        },
      ))
    : (pubDate = new Date(page.first_publication_date).toLocaleDateString(
        'en-CA',
        {
          weekday: 'long',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'UTC',
        },
      ))
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://${settings.data.domain}/#naz`,
        name: 'Naz',
        description: settings.data.site_meta_description || undefined,
      },
      {
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain}/#website`,
        name: 'Longevity Icon',
        url: 'https://longevityicon.com',
      },
      {
        '@type': 'BlogPosting',
        '@id': `https://${settings.data.domain}${page.url}/#post`,
        headline: prismic.asText(page.data.title),
        description:
          page.data.excerpt || page.data.meta_description || undefined,
        mainEntityOfPage: `https://${settings.data.domain}${page.url}`,
        datePublished: page.data.date_published || page.first_publication_date,
        dateModified: page.last_publication_date || undefined,
        author: {
          '@id': `https://${settings.data.domain}/#naz`,
        },
        image: page.data.meta_image.url || undefined,
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
        className={cn(
          'relative flex items-center justify-center bg-color-primary py-36 lg:py-44 xl:py-56 2xl:py-72',
        )}
      >
        {prismic.isFilled.image(page.data.meta_image) && (
          <PrismicNextImage
            field={page.data.meta_image}
            fill
            sizes="45vw"
            className="absolute inset-0 object-cover opacity-10"
            priority
          />
        )}
        <div className="z-20 mx-auto flex max-w-screen-sm flex-col">
          <PrismicRichText
            field={page.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading as="h1" size="7xl" className="z-10 text-color-base">
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="z-10 text-center text-sm font-medium uppercase text-color-base">
            {pubDate}
          </p>
        </div>
      </Section>
      <SliceZone slices={page.data.slices} components={components} />
      {page.data.show_disclaimer && (
        <PrismicRichText
          field={settings.data.disclaimer}
          components={{
            paragraph: ({ children }) => (
              <p className="mx-auto my-8 max-w-lg rounded border border-color-secondary p-4 text-sm">
                {children}
              </p>
            ),
            hyperlink: ({ children, node }) => (
              <PrismicNextLink
                field={node.data}
                className="underline hover:no-underline"
              >
                {children}
              </PrismicNextLink>
            ),
          }}
        />
      )}
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
