import React from 'react'
import { cn } from '@/lib/utils/cn'

type SectionProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  width?: 'full' | '2xl' | 'xl' | 'lg'
}

export default function Section({
  as: Comp = 'section',
  width = 'full',
  className,
  children,
  ...restProps
}: SectionProps) {
  return (
    <Comp className={cn('', className)} {...restProps}>
      <div
        className={cn('mx-auto py-12', {
          'w-full px-0 md:px-0 py-0 md:py-0 lg:py-0': width === 'full',
          'max-w-screen-2xl': width === '2xl',
          'max-w-screen-xl': width === 'xl',
          'max-w-screen-lg': width === 'lg',
        })}
      >
        {children}
      </div>
    </Comp>
  )
}
