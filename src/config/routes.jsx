import { useTranslation } from 'react-i18next'

import { AuthRoute } from '@/contexts/AuthContext/AuthRoute'
import { PublicRoute } from '@/contexts/AuthContext/PublicRoute'
import { RolesPermitidos } from '@/contexts/AuthContext/RolesPermitidos'

import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Usuarios } from '@/pages/Usuarios'
import { Pasarelas } from '@/pages/Pasarelas'
import { Keys } from '@/pages/Keys'
import { Pagos } from '@/pages/Pagos'
import { Perfil } from '@/pages/Perfil'
import { Error404 } from '@/pages/Error404'

import { FaHome, FaUsers, FaUser } from 'react-icons/fa'
import { IoLogIn, IoKeySharp } from 'react-icons/io5'
import { MdPayments, MdSell } from 'react-icons/md'

function Rutas() {
  const { t } = useTranslation()

  return [
    {
      path: '/',
      element: (
        <AuthRoute>
          <Home />
        </AuthRoute>
      ),
      name: t('home'),
      icon: <FaHome />,
      private: true,
      public_only: false,
      allowed_roles: ['admin', 'cliente']
    },
    {
      path: '/perfil',
      element: (
        <AuthRoute>
          <Perfil />
        </AuthRoute>
      ),
      name: t('profile'),
      icon: <FaUser />,
      private: true,
      public_only: false,
      allowed_roles: ['admin', 'cliente']
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
      name: t('login'),
      icon: <IoLogIn />,
      private: false,
      public_only: true
    },
    {
      path: '/usuarios',
      element: (
        <AuthRoute>
          <RolesPermitidos roles={['admin']}>
            <Usuarios />
          </RolesPermitidos>
        </AuthRoute>
      ),
      name: t('users'),
      icon: <FaUsers />,
      private: true,
      public_only: false,
      allowed_roles: ['admin']
    },
    {
      path: '/pasarelas',
      element: (
        <AuthRoute>
          <Pasarelas />
        </AuthRoute>
      ),
      name: t('payment_gateways'),
      icon: <MdPayments />,
      private: true,
      public_only: false,
      allowed_roles: ['admin', 'cliente']
    },
    {
      path: '/keys',
      element: (
        <AuthRoute>
          <Keys />
        </AuthRoute>
      ),
      name: t('keys'),
      icon: <IoKeySharp />,
      private: true,
      public_only: false,
      allowed_roles: ['admin', 'cliente']
    },
    {
      path: '/pagos',
      element: (
        <AuthRoute>
          <Pagos />
        </AuthRoute>
      ),
      name: t('payments'),
      icon: <MdSell />,
      private: true,
      public_only: false,
      allowed_roles: ['admin', 'cliente']
    },
    {
      path: '*',
      element: <Error404 />,
      private: false,
      public_only: false
    },
  ]
}

export { Rutas }