import Crud from '../views/FinancialCategory/Crud'
import Entity from '../views/FinancialCategory/Add'

let routes = {
    path: '/financial_categories',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/financial_categories/add',
            name: 'NewFinancialCategory',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Categoria',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Categoria',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/financial_categories/edit/:id?',
            name: 'EditFinancialCategory',
            component: Entity,
            meta: {
                pageTitle: 'Editar Categoria',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Categoria',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/financial_categories',
            name: 'list-categories',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Categorias',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Categorias',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
