import Crud from '../views/Product/Crud'
import Entity from '../views/Product/Entity'
import View from '../views/Product/View'
import GetTag from '../views/Product/GetTag'

let routes = {
    path: '/products',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/products/add',
            name: 'NewProduct',
            component: Entity,
            meta: {
                pageTitle: 'Adicionar Produto',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Adicionar Produto',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/products/edit/:id?',
            name: 'EditProduct',
            component: Entity,
            meta: {
                pageTitle: 'Editar Produto',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Editar Produto',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/products/view/:id?',
            name: 'ViewProduct',
            component: View,
            meta: {
                pageTitle: 'Visualizar Produto',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Visualizar Produto',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/products',
            name: 'list-products',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Produtos',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Produtos',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/generate-tags',
            name: 'generate-tags',
            component: GetTag,
            meta: {
                pageTitle: 'Gerar Etiquetas',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Gerar Etiquetas',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
