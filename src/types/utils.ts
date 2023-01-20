export type PageInfo = { 
  limit: number,
  skip: number,
  totalCount: number,
}

export type PaginationProps = {
  pageInfo: PageInfo,
  setPageInfo: React.Dispatch<React.SetStateAction<{
    limit: number;
    skip: number;
    totalCount: number;
  }>>
}

export type NonUndefined<T> = T extends undefined ? never: T