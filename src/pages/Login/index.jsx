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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/contexts/AuthContext/useAuth'

function Login() {
  const { t } = useTranslation()
  const auth = useAuth()

  const formSchema = z.object({
    correo: z.string().email({
      message: t('email_validation')
    }),
    password: z.string().min(8, {
      message: t('password_validation')
    })
  })

  // correo: z.union([
  //   z.string().email({
  //     message: t('email_validation')
  //   }),
  //   z.string().length(0)
  // ]).optional().transform(correo => correo === '' ? null : correo),

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: '',
      password: ''
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async ({ correo, password }) => {
    await auth.login(correo, password)
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-1/4'>
          <FormField
            control={form.control}
            name='correo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email_title')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('email_placeholder')} {...field} />
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password_title')}</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription>
                  {t('password_description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='dark:bg-gray-200 dark:text-gray-800'>{t('submit')}</Button>
        </form>
      </Form>
    </div>
  )
}


export { Login }