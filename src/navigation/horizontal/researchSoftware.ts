import { NavLinkStateName } from '@/@layouts/types'

export default [
  {
    title: 'tree.title',
    icon: { icon: 'mdi-file-tree-outline' },
    children: [
      {
        title: 'tree.changeTree',
      },
    ],
  },
  {
    title: 'view',
    icon: { icon: 'tabler-eye-up' },
  },
  {
    title: 'datatransfer',
    icon: { icon: 'tabler-transfer' },
    children: [
      {
        title: 'import',
        changeStateName: NavLinkStateName.datatransImport,
      },
      {
        title: 'export',
        changeStateName: NavLinkStateName.datatransferExport,

      },
    ],
  },
  {
    title: 'statistics',
    icon: { icon: 'tabler-chart-pie' },
    to: 'tables-data-table',

    // subject: "Report",
    // action: "read",
    children: [
      {
        title: 'Dashboard',
        to: 'forms-slider',
      },
    ],
  },
  {
    title: 'settings',
    icon: { icon: 'mdi-file-tree-outline' },
  },
]
