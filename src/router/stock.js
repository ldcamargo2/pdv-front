import Crud from '../views/Stock/Crud'
import Confirm from '../views/Stock/Confirm'
import Manual from '../views/Stock/Manual'

let routes = {
    path: '/stock',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/stock',
            name: 'stock',
            component: Crud,
            meta: {
                pageTitle: 'Inventário',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Inventário',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/stock/manual',
            name: 'manual_stock',
            component: Manual,
            meta: {
                pageTitle: 'Movimentar Estoque Manualmente',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Entrada de Estoque',
                        active: true,
                    },
                ],
            },
        },
        {
            path: '/stock/confirm-stock',
            name: 'confirm_stock',
            component: Confirm,
            meta: {
                pageTitle: 'Confirmação de Estoque',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'Confirmação de Estoque',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
