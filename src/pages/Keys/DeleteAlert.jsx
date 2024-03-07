import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'

import { IoClose } from 'react-icons/io5'

import { fetchData } from '@/lib/utils'

function DeleteAlert({
  t,
  infoKey,
  keys,
  setKeys,
  setOpenAlertModal,
  auth
}) {
  const { toast } = useToast()

  const borrarKey = async (e) => {
    e.preventDefault()

    try {
      const keyDeleted = await fetchData({
        url: `/v1/keys/${infoKey.id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.usuario.token}`
        }
      })

      toast({
        title: `${t('key')} ${t('deleted').toLowerCase()}`,
        description: t('key_deleted_correctly'),
        status: 'success'
      })

      const newKeys = keys.filter(k => k.id !== parseInt(keyDeleted.id))
      setKeys(newKeys)

      // Espera a que setKeys haya completado su actualización
      await new Promise(resolve => setTimeout(resolve, 0))

      // Después de que setKeys haya completado, entonces ejecuta setPageIndex
      infoKey.setPageIndex()
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

    setOpenAlertModal(false)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-4 sm:py-16'>
      <ScrollArea className='w-full sm:w-2/3 md:w-1/2'>
        <form onSubmit={borrarKey} className='space-y-8 w-full bg-zinc-950 p-4 rounded-xl'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-2xl'>{t('delete')} {t('key').toLowerCase()}</h1>
            <IoClose
              onClick={() => setOpenAlertModal(false)}
              className='text-2xl cursor-pointer'
            />
          </div>
          <p className='text-xl'>{t('are_you_sure_delete_key')} <b>{(infoKey.clave).slice(0, 10)}...</b>?</p>
          <div>
            <Button type='submit' className='rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'>{t('delete')}</Button>
            <Button
              type='button'
              className='ml-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              onClick={() => setOpenAlertModal(false)}
            >
              {t('close')}
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  )
}

export { DeleteAlert }