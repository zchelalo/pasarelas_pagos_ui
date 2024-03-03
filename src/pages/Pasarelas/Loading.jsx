import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
  return (
    <div className='flex flex-wrap mt-3'>
      <div className='w-full sm:w-1/2 h-80 p-2'>
        <div className='w-full h-full'>
          <Skeleton className='flex justify-start items-center h-full rounded-lg' />
        </div>
      </div>
      <div className='w-full sm:w-1/2 h-80 p-2'>
        <div className='w-full h-full'>
          <Skeleton className='flex justify-start items-center h-full rounded-lg' />
        </div>
      </div>
      <div className='w-full sm:w-1/2 h-80 p-2'>
        <div className='w-full h-full'>
          <Skeleton className='flex justify-start items-center h-full rounded-lg' />
        </div>
      </div>
    </div>
  )
}

export { Loading }