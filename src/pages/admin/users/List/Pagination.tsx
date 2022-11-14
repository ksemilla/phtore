import { PaginationProps } from '@/types'

export default function Pagination(props: PaginationProps) {

  const { pageInfo, setPageInfo } = props

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{pageInfo.skip + 1}</span> to <span className="font-medium">{pageInfo.skip + pageInfo.limit > pageInfo.totalCount ? pageInfo.totalCount : pageInfo.skip + pageInfo.limit }</span> of{' '}
          <span className="font-medium">{pageInfo.totalCount}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
          onClick={()=>{
            let newSkip = pageInfo.skip - pageInfo.limit
            if (newSkip < 0) {
              newSkip = 0
            }
            setPageInfo(prevState => ({...prevState, skip: newSkip}))
          }}
          disabled={pageInfo.skip - pageInfo.limit < 0}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
          onClick={()=>{
            let newSkip = pageInfo.skip + pageInfo.limit
            if (newSkip > pageInfo.totalCount) {
              newSkip = pageInfo.totalCount
            }
            setPageInfo(prevState => ({...prevState, skip: newSkip}))
          }}
          disabled={pageInfo.skip + pageInfo.limit > pageInfo.totalCount}
        >
          Next
        </button>
      </div>
    </nav>
  )
}
