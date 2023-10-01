import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'
import { cn } from '@/lib/utils/cn'

/**
 * Props for `Inspire`.
 */
export type InspireProps = SliceComponentProps<Content.InspireSlice>

/**
 * Component for "Inspire" Slices.
 */
const Inspire = ({ slice, index }: InspireProps): JSX.Element => {
  if (slice.variation === 'default') {
    return (
      <Section
        width="full"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={cn('relative', { '': index === 0 })}
      >
        <div className="aspect-w-16 aspect-h-9">
          {slice?.primary?.image.url && (
            <PrismicNextImage field={slice.primary.image} fallbackAlt="" />
          )}
        </div>
        <div className="mt-8">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h1"
                  size="7xl"
                  className="text-center lg:text-center"
                >
                  {children}
                </Heading>
              ),
              heading2: ({ children }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-center lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
          <div className="prose lg:prose-lg xl:prose-xl mx-auto">
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
      </Section>
    )
  } else {
    return (
      <Section
        width="full"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={cn('relative', { '': index === 0 })}
      >
        <div className="aspect-w-16 aspect-h-9">
          {isFilled.linkToMedia(slice.primary.video) && (
            <video
              src={slice.primary.video.url}
              className="hidden lg:block "
              autoPlay
              loop
              muted
            />
          )}
        </div>
        <div className="mt-8">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h1"
                  size="7xl"
                  className="text-center lg:text-center"
                >
                  {children}
                </Heading>
              ),
              heading2: ({ children }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-center lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
          <div className="prose lg:prose-lg xl:prose-xl mx-auto">
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
      </Section>
    )
  }
}

export default Inspire
