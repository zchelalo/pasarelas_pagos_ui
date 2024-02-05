import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/ui/select'

function SelectorIdioma({ handleSelectChange, idioma }) {

  return (
    <Select onValueChange={handleSelectChange} defaultValue={idioma}>
      <SelectTrigger className='w-5/12 dark:text-gray-800 dark:bg-gray-200'>
        <SelectValue placeholder='Idioma / Language' />
      </SelectTrigger>
      <SelectContent className='dark:bg-gray-200'>
        <SelectGroup>
          <SelectItem value='en' className='dark:bg-gray-200 dark:text-gray-800 dark:focus:text-gray-200 dark:focus:bg-gray-800'>English</SelectItem>
          <SelectItem value='es' className='dark:bg-gray-200 dark:text-gray-800 dark:focus:text-gray-200 dark:focus:bg-gray-800'>Español</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { SelectorIdioma }