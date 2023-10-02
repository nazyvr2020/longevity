import { createClient } from '@/prismicio'
import { cn } from '@/lib/utils/cn'
import FooterLogo from './FooterLogo'
import { PrismicRichText } from './PrismicRichText'
import Heading from './Heading'
// import Link from 'next/link'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <footer
      className={cn(
        'bg-color-primary text-color-base lg:text-lg border-b-[32px] border-b-color-secondary flex flex-col items-center pt-16 text-center'
      )}
    >
      <FooterLogo className="inline" />
      <PrismicRichText
        field={settings.data.footer_slogan}
        components={{
          heading2: ({ children }) => (
            <Heading
              as="h2"
              size="5xl"
              className="text-color-base max-w-xs lg:text-center my-16"
            >
              {children}
            </Heading>
          ),
        }}
      />
      <p className="pt-32 pb-16">
        &copy; {new Date().getFullYear()} Longevity Icon
      </p>
    </footer>
  )
}
