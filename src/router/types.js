import Crud from '../views/Type/Crud'
import Entity from '../views/Type/Entity'

let routes = {
    path: '/types',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/types/add',
            name: 'NewType',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Tipo',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Tipo',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/types/edit/:id?',
            name: 'EditType',
            component: Entity,
            meta: {
                pageTitle: 'Editar Tipo',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Tipo',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/types',
            name: 'list-types',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Tipos',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Tipos',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
