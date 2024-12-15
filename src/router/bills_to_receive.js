import Crud from '../views/BillsToReceive/Crud'
import Entity from '../views/BillsToReceive/Entity'

let routes = {
    path: '/bills_receive',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/bills_receive',
            name: 'BillsToReceive',
            component: Crud
        },
        {
            path: '/bills_receive/add',
            name: 'BillsToPayAdd',
            component: Entity
        },
        {
            path: '/bills_receive/edit/:id',
            name: 'BillsToPayEdit',
            component: Entity
        },
    ]
}

export default routes
