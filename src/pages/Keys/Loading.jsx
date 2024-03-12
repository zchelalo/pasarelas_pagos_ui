import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
  return (
    <>
      <div className='w-full flex justify-start items-center'>
        <div className='w-full my-4 h-10 flex justify-between items-center'>
          <Skeleton className='w-2/3 sm:w-1/3 h-full rounded-lg' />
          <Skeleton className='w-1/3 sm:w-1/6 h-full rounded-lg' />
        </div>
      </div>
      <div className='w-full flex justify-start items-center'>
        <div className='w-full h-[75vh] flex justify-between items-center'>
          <Skeleton className='w-full h-full rounded-lg' />
        </div>
      </div>
      <div className='w-full flex justify-start items-center'>
        <div className='w-full my-4 h-10 flex flex-wrap'>
          <Skeleton className='w-1/3 sm:w-1/12 h-full rounded-lg' />
          <Skeleton className='ml-2 w-1/3 sm:w-1/12 h-full rounded-lg' />
        </div>
      </div>
    </>
  )
}

export { Loading }