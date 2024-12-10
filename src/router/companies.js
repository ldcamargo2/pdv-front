import Crud from '../views/Company/Crud'
import Entity from '../views/Company/Entity'

let routes = {
    path: '/companies',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/companies/add',
            name: 'NewCompany',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Empresa',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Empresa',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/companies/edit/:id?',
            name: 'EditCompany',
            component: Entity,
            meta: {
                pageTitle: 'Editar Empresa',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Empresa',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/companies',
            name: 'list-companies',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Empresas',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Empresas',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
