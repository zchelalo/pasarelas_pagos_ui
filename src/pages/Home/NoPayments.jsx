import { BsDatabaseX } from 'react-icons/bs'

function NoPayments({ t }) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='text-4xl mt-5'>
        <span className='text-center flex flex-wrap justify-center items-center'>
          {t('no_payments_registered')} <BsDatabaseX className='ml-4 mt-4 text-6xl sm:mt-0' />
        </span>
      </div>
    </div>
  )
}

export { NoPayments }