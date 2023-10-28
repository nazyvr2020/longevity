import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { PrismicRichText } from '@/components/PrismicRichText'
/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<Content.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
      className="py-6 lg:py-12"
    >
      <div className="prose mx-auto px-4 lg:prose-lg xl:prose-xl lg:px-0">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Section>
  )
}

export default Content
