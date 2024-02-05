import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'

import { MdDelete } from 'react-icons/md'

import { formatDate } from '@/lib/utils'

function Columns({ t }) {

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'id'
    },
    {
      header: t('payment_status'),
      accessorKey: 'estadoPago.nombre',
      cell: info => {
        if (info.getValue() === 'Pendiente') {
          return (
            <span className='bg-yellow-400 text-yellow-800 font-semibold p-1 rounded'>{info.getValue()}</span>
          )
        }

        if (info.getValue() === 'Cancelado') {
          return (
            <span className='bg-red-400 text-red-800 font-semibold p-1 rounded'>{info.getValue()}</span>
          )
        }

        if (info.getValue() === 'Completado') {
          return (
            <span className='bg-green-400 text-green-800 font-semibold p-1 rounded'>{info.getValue()}</span>
          )
        }
      }
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'total',
      cell: info => info.getValue() ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(info.getValue())) : ''
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('created_at')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'createdAt',
      cell: info => info.getValue() ? formatDate(info.getValue()) : ''
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('updated_at')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'updatedAt',
      cell: info => info.getValue() ? formatDate(info.getValue()) : ''
    },
    {
      id: 'actions',
      header: ({ table }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t('open_menu')}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log(table.getSelectedRowModel())}
                className='cursor-pointer'
              >
                <MdDelete /> <span className='ml-2'>{t('delete_selected_columns')}</span>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      cell: ({ row }) => {
        const pago = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t('open_menu')}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(pago.id)}
                className='cursor-pointer'
              >
                {t('copy_id')}
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return columns
}

export { Columns }