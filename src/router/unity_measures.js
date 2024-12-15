import Crud from "../views/UnityMeasure/Crud";
import Entity from "../views/UnityMeasure/Entity";

let routes = {
  path: "/unity_measures",
  component: (resolve) => require(["../layouts/full/LayoutFull"], resolve),
  children: [
    {
      path: "/unity_measures/add",
      name: "NewUnitMeasure",
      component: Entity,
      meta: {
        pageTitle: "Adicionar Unidade de Medida",
        access_nivel: ["1", "2"],
        breadcrumb: [
          {
            text: "Adicionar Unidade de Medida",
            active: true,
          },
        ],
      },
    },
    {
      path: "/unity_measures/edit/:id?",
      name: "EditUnitMeasure",
      component: Entity,
      meta: {
        pageTitle: "Editar Unidade de Medida",
        access_nivel: ["1", "2"],
        breadcrumb: [
          {
            text: "Editar Unidade de Medida",
            active: true,
          },
        ],
      },
    },
    {
      path: "/unity_measures",
      name: "list-unity_measures",
      component: Crud,
      meta: {
        pageTitle: "Lista de Unidades de Medida",
        access_nivel: ["1", "2"],
        breadcrumb: [
          {
            text: "Unidades de Medida",
            active: true,
          },
        ],
      },
    },
  ],
};

export default routes;
