import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/ui/select'

function SelectorTheme({ handleChangeTheme, theme }) {
  const { t } = useTranslation()

  return (
    <Select onValueChange={handleChangeTheme} defaultValue={theme}>
      <SelectTrigger className='w-5/12 dark:text-gray-800 dark:bg-gray-200'>
        <SelectValue placeholder='Idioma / Language' />
      </SelectTrigger>
      <SelectContent className='dark:bg-gray-200'>
        <SelectGroup>
          <SelectItem value='dark' className='dark:bg-gray-200 dark:text-gray-800 dark:focus:text-gray-200 dark:focus:bg-gray-800'>{t('theme_dark')}</SelectItem>
          <SelectItem value='light' className='dark:bg-gray-200 dark:text-gray-800 dark:focus:text-gray-200 dark:focus:bg-gray-800'>{t('theme_light')}</SelectItem>
          <SelectItem value='system' className='dark:bg-gray-200 dark:text-gray-800 dark:focus:text-gray-200 dark:focus:bg-gray-800'>{t('theme_system')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { SelectorTheme }