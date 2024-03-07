import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { IoClose } from 'react-icons/io5'

import { fetchData } from '@/lib/utils'

function EditForm({
  t,
  infoKey,
  setOpenEditModal,
  auth
}) {
  const { toast } = useToast()

  const actualizarKey = async (e) => {
    e.preventDefault()

    try {
      const newKey = await fetchData({
        url: `/v1/keys/${infoKey.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.usuario.token}`
        }
      })

      toast({
        title: `${t('secret_key')} ${t('updated').toLowerCase()}`,
        description: t('secret_key_updated_correctly'),
        action: <ToastAction onClick={() => navigator.clipboard.writeText(newKey.newKey)} altText="Copy">Copy</ToastAction>,
        status: 'success'
      })
    } catch (error) {
      if (error.error) {
        if (error.status === 401) {
          auth.logout()
        }
  
        toast({
          title: 'Error',
          description: error.error,
          status: 'error'
        })
      }
    }

    setOpenEditModal(false)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-4 sm:py-16'>
      <ScrollArea className='w-full sm:w-2/3 md:w-1/2'>
        <form onSubmit={actualizarKey} className='space-y-8 w-full bg-zinc-950 p-4 rounded-xl'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-2xl'>{t('update')} {t('secret_key').toLowerCase()}</h1>
            <IoClose
              onClick={() => setOpenEditModal(false)}
              className='text-2xl cursor-pointer'
            />
          </div>
          <p className='text-xl'>{t('are_you_sure_update_secret_key')}</p>
          <small>{t('previous_secret_key_will_stop_working')}</small>
          <div>
            <Button type='submit' className='rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'>{t('update')}</Button>
            <Button
              type='button'
              className='ml-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              onClick={() => setOpenEditModal(false)}
            >
              {t('close')}
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  )
}

export { EditForm }