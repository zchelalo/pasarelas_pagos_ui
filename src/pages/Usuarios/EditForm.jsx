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
import { IoClose } from 'react-icons/io5'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { primeraMayuscula } from '@/lib/utils'

function EditForm({ t, usuario, tiposUsuario, setOpenEditModal }) {
  const formSchema = z.object({
    nombre: z.string().min(1, {
      message: 'El nombre es requerido'
    }),
    correo: z.string().email({
      message: t('email_validation')
    }),
    tiposUsuarioId: z.number().int({
      message: 'El tipo de usuario debe ser un valor entero positivo'
    }).or(z.string().regex(/^[1-9]\d*$/, {
      message: 'El tipo de usuario debe ser un valor entero positivo'
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

  const onSubmit = ({ nombre, correo, tiposUsuarioId }) => {
    console.log(nombre, correo, tiposUsuarioId)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-4 sm:py-16'>
      <ScrollArea className='w-full sm:w-2/3 md:w-1/2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full bg-zinc-950 p-4 rounded-xl'>
            <div className='flex flex-row justify-between items-center'>
              <h1 className='text-2xl'>Editar usuario</h1>
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
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input className='bg-zinc-900' placeholder={t('email_placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>
                    Ingrese un nombre
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
                  <FormLabel>Tipo de usuario</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full bg-zinc-900'>
                        <SelectValue placeholder='Tipo de usuario' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-zinc-900'>
                      {tiposUsuario?.map((tipoUsuario) => (
                        <SelectItem key={tipoUsuario.id} value={(tipoUsuario.id).toString()}>{primeraMayuscula(tipoUsuario.nombre)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Seleccione un tipo de usuario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type='submit' className='dark:bg-gray-200 dark:text-gray-800'>{t('submit')}</Button>
              <Button
                type='button'
                className='ml-2 dark:bg-gray-200 dark:text-gray-800'
                onClick={() => setOpenEditModal(false)}
              >
                Cerrar
                </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  )
}

export { EditForm }