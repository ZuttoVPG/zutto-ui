import Login from '@/components/Login'
import Signup from '@/components/Signup'

export default [
  {
    path: '/login',
    name: 'public.login',
    component: Login
  },

  {
    path: '/signup',
    name: 'public.signup',
    component: Signup
  }
]
