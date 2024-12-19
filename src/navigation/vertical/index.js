export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
    access_nivel: [1, 2],
  },
  {
    title: 'Cadastros',
    icon: 'FileTextIcon',
    access_nivel: [1],
    children: [
      {
        title: 'Usuários',
        route: 'list-users',
        access_nivel: [1],
      },
      {
        title: 'Empresas',
        route: 'list-companies',
        access_nivel: [1],
      },
      {
        title: 'Clientes',
        route: 'list-customers',
        access_nivel: [1],
      },
      {
        title: 'Fornecedores',
        route: 'list-suppliers',
        access_nivel: [1],
      },
      {
        title: 'Produtos',
        route: 'list-products',
        access_nivel: [1],
      },
      {
        title: 'Tipos de Produtos',
        route: 'list-types',
        access_nivel: [1],
      },
      {
        title: 'Unidades de Medida',
        route: 'list-unity_measures',
        access_nivel: [1],
      },
      {
        title: 'Dimensões',
        route: 'list-dimensions',
        access_nivel: [1],
      },
      {
        title: 'Categorias Financeiras',
        route: 'list-categories',
        access_nivel: [1],
      },
    ],
  },  
  {
    title: 'Contas a Pagar',
    route: 'BillsToPay',
    icon: 'PlusCircleIcon',
    access_nivel: [1, 2],
  },
  {
    title: 'Contas a Receber',
    route: 'BillsToReceive',
    icon: 'MinusCircleIcon',
    access_nivel: [1, 2],
  },
  {
    title: 'Movimentar Estoque',
    route: 'manual_stock',
    icon: 'GridIcon',
    access_nivel: [1, 2],
  },
  {
    title: 'Inventário',
    route: 'stock',
    icon: 'TerminalIcon',
    access_nivel: [1, 2],
  },
  {
    title: 'PDV',
    route: 'PDV',
    icon: 'TagIcon',
    access_nivel: [1, 2],
  },
]
