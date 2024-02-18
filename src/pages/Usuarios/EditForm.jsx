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
import { IoClose } from 'react-icons/io5'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { fetchData } from '@/lib/utils'

function EditForm({
  t,
  usuario,
  usuarios,
  setUsuarios,
  tiposUsuario,
  setOpenEditModal,
  auth
}) {
  const { toast } = useToast()

  const formSchema = z.object({
    nombre: z.string().min(1, {
      message: t('name_required')
    }),
    correo: z.string().email({
      message: t('email_validation')
    }),
    tiposUsuarioId: z.number().int({
      message: t('user_type_value_validation')
    }).or(z.string().regex(/^[1-9]\d*$/, {
      message: t('user_type_value_validation')
    }).transform(Number))
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: usuario.nombre,
      correo: usuario.correo,
      tiposUsuarioId: (usuario.tiposUsuarioId).toString()
    }
  })

  const onSubmit = async ({ nombre, correo, tiposUsuarioId }) => {
    try {
      await fetchData({
        url: `/v1/usuarios/${usuario.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.usuario.token}`
        },
        body: JSON.stringify({
          nombre,
          correo,
          tiposUsuarioId
        })
      })

      toast({
        title: t('user_updated'),
        description: t('user_updated_correctly'),
        status: 'success'
      })

      let newUsuarios = usuarios.map(u => {
        if (u.id !== usuario.id) return u
        return {
          ...u,
          nombre,
          correo,
          tiposUsuarioId: parseInt(tiposUsuarioId)
        }
      })
      setUsuarios(newUsuarios)

      // Espera a que setUsuarios haya completado su actualización
      await new Promise(resolve => setTimeout(resolve, 0))

      // Después de que setUsuarios haya completado, entonces ejecuta setPageIndex
      usuario.setPageIndex()
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full bg-zinc-950 p-4 rounded-xl'>
            <div className='flex flex-row justify-between items-center'>
              <h1 className='text-2xl'>{t('edit_user')}</h1>
              <IoClose
                onClick={() => setOpenEditModal(false)}
                className='text-2xl cursor-pointer'
              />
            </div>
            <FormField
              control={form.control}
              name='nombre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input className='bg-zinc-900' placeholder={t('name')} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('enter_a')} {t('name').toLowerCase()}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='correo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email_title')}</FormLabel>
                  <FormControl>
                    <Input className='bg-zinc-900' placeholder={t('email_placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('email_description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tiposUsuarioId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('user_type')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full bg-zinc-900'>
                        <SelectValue placeholder={t('user_type')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-zinc-900'>
                      {tiposUsuario?.map((tipoUsuario) => (
                        <SelectItem key={tipoUsuario.id} value={(tipoUsuario.id).toString()}>{t(tipoUsuario.nombre)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t('select_a')} {t('user_type').toLowerCase()}
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
                onClick={() => setOpenEditModal(false)}
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

export { EditForm }