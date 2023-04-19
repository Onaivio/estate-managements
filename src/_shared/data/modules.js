export default [
  {
    name: 'App',
    module: 'app',
    icon: 'fa fa-home',
    active: false,
    isAdmin: true,
    isAppModule: false,
    code: 'app',
    profiles: ['App'],
    roles: ['super_admin']
  },
  {
    name: 'EazyAdmin',
    module: 'admin',
    icon: 'fa fa-home',
    active: false,
    isAdmin: false,
    isAppModule: false,
    code: 'admin',
    profiles: ['Admin'],
    roles: ['admin',]
  }
]
