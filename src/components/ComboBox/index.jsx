import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Check, ChevronsUpDown } from 'lucide-react'

import { useTranslation } from 'react-i18next'

function ComboBox({ filtros, value, setValue }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? filtros.find(filtro => filtro.value === value)?.label
            : t('select_filter')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t('search')} />
          <CommandEmpty>{t('no_results_found')}</CommandEmpty>
          <CommandGroup>
            {filtros.map((filtro) => (
              <CommandItem
                key={filtro.value}
                value={filtro.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === filtro.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {filtro.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { ComboBox }