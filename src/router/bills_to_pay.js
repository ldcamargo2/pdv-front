import Crud from '../views/BillsToPay/Crud'
import Entity from '../views/BillsToPay/Entity'

let routes = {
    path: '/bills_pay',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/bills_pay',
            name: 'BillsToPay',
            component: Crud
        },
        {
            path: '/bills_pay/add',
            name: 'Bills to Pay Add',
            component: Entity
        },
        {
            path: '/bills_pay/edit/:id',
            name: 'Bills to Pay Edit',
            component: Entity
        },
    ]
}

export default routes
