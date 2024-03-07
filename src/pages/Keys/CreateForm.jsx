import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { IoClose } from 'react-icons/io5'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { fetchData } from '@/lib/utils'

function CreateForm({
  t,
  keys,
  setKeys,
  pasarelas,
  setOpenCreateModal,
  auth
}) {
  const { toast } = useToast()

  const formSchema = z.object({
    pasarelaId: z.number().int({
      message: t('payment_gateway_value_validation')
    }).or(z.string().regex(/^[1-9]\d*$/, {
      message: t('payment_gateway_value_validation')
    }).transform(Number))
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pasarelaId: ''
    }
  })

  const onSubmit = async ({ pasarelaId }) => {
    try {
      const newKey = await fetchData({
        url: `/v1/keys`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.usuario.token}`
        },
        body: JSON.stringify({
          usuarioId: auth.usuario.id,
          pasarelaId
        })
      })

      toast({
        title: `${t('key')} ${t('created').toLowerCase()}`,
        description: t('key_created_correctly'),
        action: <ToastAction onClick={() => navigator.clipboard.writeText(newKey.newKey)} altText="Copy">Copy</ToastAction>,
        status: 'success'
      })

      newKey.pasarela = pasarelas.find(p => p.id === newKey.pasarelaId)
      newKey.usuario = {
        nombre: auth.usuario.nombre
      }
      setKeys([...keys, newKey])
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

    setOpenCreateModal(false)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-4 sm:py-16'>
      <ScrollArea className='w-full sm:w-2/3 md:w-1/2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full bg-zinc-950 p-4 rounded-xl'>
            <div className='flex flex-row justify-between items-center'>
              <h1 className='text-2xl'>{t('create')} {t('key').toLowerCase()}</h1>
              <IoClose
                onClick={() => setOpenCreateModal(false)}
                className='text-2xl cursor-pointer'
              />
            </div>
            <FormField
              control={form.control}
              name='pasarelaId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('payment_gateway')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full bg-zinc-900'>
                        <SelectValue placeholder={t('payment_gateway')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-zinc-900'>
                      {pasarelas?.map(pasarela => (
                        <SelectItem key={pasarela.id} value={(pasarela.id).toString()}>{pasarela.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t('select_a')} {t('payment_gateway').toLowerCase()}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type='submit' className='rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'>{t('submit')}</Button>
              <Button
                type='button'
                className='ml-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                onClick={() => setOpenCreateModal(false)}
              >
                {t('close')}
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  )
}

export { CreateForm }