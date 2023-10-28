import { createClient } from '@/prismicio'
import { cn } from '@/lib/utils/cn'
import FooterLogo from './FooterLogo'
import { PrismicRichText } from './PrismicRichText'
import Heading from './Heading'
import { isFilled } from '@prismicio/client'
import Link from 'next/link'
// import Link from 'next/link'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <footer
      className={cn(
        'flex flex-col items-center border-b-[32px] border-b-color-secondary bg-color-primary pt-16 text-center text-color-base lg:text-lg',
      )}
    >
      <FooterLogo className="inline h-[70px] lg:h-[100px]" />
      <PrismicRichText
        field={settings.data.footer_slogan}
        components={{
          heading2: ({ children }) => (
            <Heading
              as="h2"
              size="5xl"
              className="my-16 max-w-xs text-color-base lg:text-center"
            >
              {children}
            </Heading>
          ),
        }}
      />
      {isFilled.keyText(settings.data.footer_email) && (
        <a
          href={`mailto:${settings.data.footer_email}`}
          className="inline-block rounded bg-color-secondary px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-color-primary transition duration-150 ease-in hover:shadow hover:shadow-amber-500"
        >
          {settings.data.footer_button_text || 'Contact Me'}
        </a>
      )}
      <p className="pb-16 pt-28">
        &copy; {new Date().getFullYear()} Longevity Icon
      </p>
      <Link href={'/disclaimer'} className='text-sm text-color-secondary my-6'>Disclaimer</Link>
    </footer>
  )
}
