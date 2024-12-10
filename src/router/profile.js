
import Profile from '../views/Auth/Profile'

let routes = {
  path: '/users',
  component: resolve => require(['../layouts/full/LayoutFull'], resolve),
  children: [
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        pageTitle: 'Meu Perfil',
        breadcrumb: [
          {
            text: 'Perfil',
            active: true,
          },
        ],
      },
    },
  ]
};


export default routes
