import Index from '../views/PDV/Index'

let routes = {
    path: '/pdv',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/pdv',
            name: 'PDV',
            component: Index,
            meta: {
                pageTitle: 'PDV',
                access_nivel: ['1', '2'],
                breadcrumb: [
                    {
                        text: 'PDV',
                        active: true,
                    },
                ],
            },
        }
    ]
};


export default routes
