import Crud from '../views/Supplier/Crud'
import Entity from '../views/Supplier/Entity'

let routes = {
    path: '/suppliers',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/suppliers/add',
            name: 'NewSupplier',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Fornecedor',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Fornecedor',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/suppliers/edit/:id?',
            name: 'EditSupplier',
            component: Entity,
            meta: {
                pageTitle: 'Editar Fornecedor',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Fornecedor',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/suppliers',
            name: 'list-suppliers',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Fornecedores',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Fornecedores',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
