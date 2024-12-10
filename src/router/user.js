import Crud from '../views/User/Crud'
import Entity from '../views/User/Add'

let routes = {
    path: '/users',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/users/add',
            name: 'NewUser',
            component: Entity,
            meta: {
                pageTitle: 'Usuário',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Usuário',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/users/edit/:id?',
            name: 'EditUser',
            component: Entity,
            meta: {
                pageTitle: 'Usuário',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Usuário',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/users',
            name: 'list-users',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Usuários',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Usuários',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
