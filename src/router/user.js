import User from '@/components/User'

export default [
  {
    path: '/user/:userId',
    name: 'user.profile',
    component: User
  },
  {
    path: '/user',
    name: 'user.settings',
    component: null
  }
]
