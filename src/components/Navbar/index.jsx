import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoLogOut } from 'react-icons/io5'
import { CgClose } from 'react-icons/cg'

import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SelectorIdioma } from './SelectorIdioma'
import { SelectorTheme } from './SelectorTheme'
import { Rutas } from '../../config/routes.jsx'
import { useAuth } from '@/contexts/AuthContext/useAuth'

function Navbar({ handleSelectChange, handleChangeTheme, idioma, theme }) {
  const routes = Rutas()
  const { t } = useTranslation()
  const rutaPerfil = routes.find(route => route.path === '/perfil')

  const auth = useAuth()

  const handleLogout = () => {
    auth.logout()
  }
  
  return (
    <>
      <Sheet>

        <SheetTrigger
          className='fixed bottom-6 right-6 dark:bg-gray-900 dark:text-gray-200 shadow-2xl shadow-gray-900 dark:shadow-gray-900 p-4 rounded-full text-3xl'
        >
          <AiOutlineMenu />
        </SheetTrigger>

        <SheetContent side='left' className='dark:bg-gray-900 dark:border-r-gray-900'>

          <SheetHeader className='mb-4'>
            <div className='flex justify-between'>
              <SelectorIdioma
                handleSelectChange={handleSelectChange}
                idioma={idioma}
              />
              <SelectorTheme
                handleChangeTheme={handleChangeTheme}
                theme={theme}
              />
              <SheetClose className='w-2/12 flex justify-end items-center dark:text-gray-200 text-xl'>
                <CgClose />
              </SheetClose>
            </div>

            <SheetTitle className='dark:text-gray-200 text-lg'>{t('payment_gateways')}</SheetTitle>
          </SheetHeader>

          <nav className='mb-4'>
            <ul>
              {routes && routes.map(route => {

                if (!route.name) return undefined

                if (route.private && !route.allowed_roles.includes(auth.usuario.rol)) return undefined

                if (route.path !== '/login' && route.path !== '/logout' && route.path !== '/perfil') {
                  return (
                    <li key={route.path} className='mb-2'>
                      <NavLink
                        className={({ isActive }) => `flex items-center text-lg dark:text-gray-200 hover:border-r-2 dark:border-r-gray-200 border-r-gray-800 ${isActive && 'font-semibold'}`}
                        to={route.path}
                      >
                        {route.icon ? route.icon : undefined}<span className='ml-2'>{route.name}</span>
                      </NavLink>
                    </li>
                  )
                } else {
                  return undefined
                }

              })}
            </ul>
          </nav>

          <SheetFooter className='flex-col'>
            <NavLink
              className={({ isActive }) => `flex flex-wrap justify-center items-center sm:w-1/2 text-lg dark:text-gray-800 dark:bg-gray-200 p-2 mb-1 rounded-lg dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:bg-gray-800 hover:text-gray-200 ${isActive && 'font-semibold'}`}
              to={rutaPerfil.path}
            >
              {rutaPerfil.icon ? rutaPerfil.icon : undefined}<span className='ml-2'>{rutaPerfil.name}</span>
            </NavLink>

            <Button
              className='h-full sm:w-1/2 text-lg dark:text-gray-800 dark:bg-gray-200 p-2 mb-1 rounded-lg dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:bg-gray-800 hover:text-gray-200'
              onClick={handleLogout}
            >
              <IoLogOut /><span className='ml-2'>{t('logout')}</span>
            </Button>

          </SheetFooter>

        </SheetContent>
      </Sheet>
    </>
  )
}

export { Navbar }