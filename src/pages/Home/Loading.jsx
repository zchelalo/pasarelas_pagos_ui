import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='w-full mb-2 sm:w-1/3 sm:mb-2 h-10'>
          <Skeleton className='flex justify-start items-center h-full mx-2 px-4 rounded-lg' />
        </div>
      </div>
      <div className='w-full flex flex-wrap mb-4'>
        <div className='w-full mb-2 sm:w-1/3 sm:mb-0 h-24'>
          <Skeleton className='flex justify-start items-center h-full m-2 py-3 px-4 rounded-lg' />
        </div>
        <div className='w-full mb-2 sm:w-1/3 sm:mb-0 h-24'>
          <Skeleton className='flex justify-start items-center h-full m-2 py-3 px-4 rounded-lg' />
        </div>
        <div className='w-full mb-2 sm:w-1/3 sm:mb-0 h-24'>
          <Skeleton className='flex justify-start items-center h-full m-2 py-3 px-4 rounded-lg' />
        </div>
      </div>
      <div className='w-full flex flex-wrap'>
        <div className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3'>
          <Skeleton className='p-2 sm:p-4 md:p-6 rounded-lg m-2 h-[19rem]'/>
        </div>
        <div className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3'>
          <Skeleton className='p-2 sm:p-4 md:p-6 rounded-lg m-2 h-[19rem]'/>
        </div>
        <div className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3'>
          <Skeleton className='p-2 sm:p-4 md:p-6 rounded-lg m-2 h-[19rem]'/>
        </div>
      </div>
    </>
  )
}

export { Loading }