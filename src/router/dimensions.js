import Crud from '../views/Dimension/Crud'
import Entity from '../views/Dimension/Entity'

let routes = {
    path: '/dimensions',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/dimensions/add',
            name: 'NewType',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Dimensão',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Dimensão',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/dimensions/edit/:id?',
            name: 'EditType',
            component: Entity,
            meta: {
                pageTitle: 'Editar Dimensão',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Dimensão',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/dimensions',
            name: 'list-dimensions',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Dimensões',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Dimensãos',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
