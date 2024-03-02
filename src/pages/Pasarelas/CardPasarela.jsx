import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { useToast } from '@/components/ui/use-toast'

import moment from 'moment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { fetchData } from '@/lib/utils'

function CardPasarela({ t, pasarela, auth }) {
  const { toast } = useToast()

  const formSchema = z.object({
    apiKey: z.string().min(1, {
      message: t('api_key_required')
    })
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: ''
    }
  })

  const onSubmit = async ({ apiKey }) => {
    try {
      await fetchData({
        url: `/v1/pasarelas/${pasarela.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.usuario.token}`
        },
        body: JSON.stringify({
          apiKey
        })
      })

      toast({
        title: t('payment_gateway_updated'),
        description: t('payment_gateway_updated_correctly'),
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

    form.reset()
  }

  return (
    <div className='p-1 w-full sm:w-1/2'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{pasarela.nombre}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
              <FormField
                control={form.control}
                name='apiKey'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('api_key')}</FormLabel>
                    <FormControl>
                      <Input type='password' className='bg-zinc-900' placeholder={t('api_key')} {...field} />
                    </FormControl>
                    <FormDescription>
                      {t('enter_a')} {t('api_key').toLowerCase()}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type='submit' className='w-full sm:w-auto rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'>{t('submit')}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>{t('last_updated')}: {moment.utc(pasarela.updatedAt).local().format('DD-MM-YYYY HH:mm')}</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export { CardPasarela }