import Crud from '../views/Customer/Crud'
import Entity from '../views/Customer/Entity'

let routes = {
    path: '/customers',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/customers/add',
            name: 'NewCustomer',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Cliente',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Cliente',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/customers/edit/:id?',
            name: 'EditCustomer',
            component: Entity,
            meta: {
                pageTitle: 'Editar Cliente',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Cliente',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/customers',
            name: 'list-customers',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Clientes',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Clientes',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
