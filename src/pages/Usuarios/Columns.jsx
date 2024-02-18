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

import moment from 'moment'

function Columns({ t, setOpenEditModal, setOpenAlertModal, setInfoUsuario }) {
  const abrirModalEditar = (usuario) => {
    setOpenEditModal(true)
    setInfoUsuario(usuario)
  }

  const abrirAlertBorrar = (usuario) => {
    setOpenAlertModal(true)
    setInfoUsuario(usuario)
  }

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
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('name')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'nombre'
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('email')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'correo'
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('user_type')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'tipoUsuario.nombre',
      cell: info => t(info.getValue())
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
      cell: info => info.getValue() ? moment(info.getValue()).utc(true).local().format('DD/MM/YYYY HH:mm:ss') : ''
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
      cell: info => info.getValue() ? moment(info.getValue()).utc(true).local().format('DD/MM/YYYY HH:mm:ss') : ''
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
      cell: ({ row, table }) => {
        const usuario = row.original
        const paginaActual = table.options.state.pagination.pageIndex
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
                onClick={() => navigator.clipboard.writeText(usuario.id)}
                className='cursor-pointer'
              >
                {t('copy_id')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => abrirModalEditar({ ...usuario, setPageIndex: () => table.setPageIndex(paginaActual) })}
              >
                {t('edit')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => abrirAlertBorrar({ ...usuario, setPageIndex: () => table.setPageIndex(paginaActual) })}
              >
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return columns
}

export { Columns }