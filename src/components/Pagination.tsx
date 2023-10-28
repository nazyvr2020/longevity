'use client'
import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface PaginationProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
}

const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageNumber = searchParams.get('page') || '1'
  return (
    <>
      <div className="flex justify-center gap-2">
        <button
          className={cn(
            'inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base',
            {
              'ease-inhover:bg-emerald-900 transition duration-150 hover:shadow hover:shadow-color-primary':
                hasPrevPage,
              'bg-color-neutral': !hasPrevPage,
            },
          )}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`blog/?page=${Number(pageNumber) - 1}`)
          }}
        >
          prev page
        </button>

        {/* <div>
        {pageNumber} / {Math.ceil(10 / Number(per_page))}
      </div> */}

        <button
          className={cn(
            'inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base',
            {
              'ease-inhover:bg-emerald-900 transition duration-150 hover:shadow hover:shadow-color-primary':
                hasNextPage,
              'bg-color-neutral': !hasNextPage,
            },
          )}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`blog/?page=${Number(pageNumber) + 1}`)
          }}
        >
          next page
        </button>
      </div>
      <div className="my-6 flex justify-center ">
        Page {pageNumber} of {totalPages}
      </div>
    </>
  )
}
export default Pagination
