import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'
import { cn } from '@/lib/utils/cn'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice }: ImageWithTextProps): JSX.Element => {
  return (
    <Section
      width="xl"
      className="py-16 px-4 lg:px-0"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={cn(
          'grid lg:grid-cols-2 gap-x-16 place-items-center relative'
        )}
      >
        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            className={cn('my-6', {
              'order-2': slice.primary.image_location === true,
            })}
          />
        )}
        <div
          className={cn('', {
            'order-1': slice.primary.image_location === true,
          })}
        >
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.text} />
        </div>
      </div>
    </Section>
  )
}

export default ImageWithText
