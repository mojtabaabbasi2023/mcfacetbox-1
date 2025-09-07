import { NavLinkStateName } from '@/@layouts/types'

export default [
  {
    title: 'view',
    icon: { icon: 'tabler-eye-up' },
    children: [
      {
        title: 'tree.tree',
        changeStateName: NavLinkStateName.showTree,
        icon: { icon: 'tabler-binary-tree' },
      },
      {
        title: 'gathering',
        changeStateName: NavLinkStateName.showGathering,
        icon: { icon: 'tabler-cloud-search' },

      },
      {
        title: 'excerpts',
        changeStateName: NavLinkStateName.showExcerpt,
        icon: { icon: 'tabler-notebook' },

      },
    ],
  },
  {
    title: 'facilities',
    icon: { icon: 'tabler-tools' },

    // to: 'tables-data-table',

    // subject: "Report",
    // action: "read",
    children: [
      {
        title: 'tree.preview',
        changeStateName: NavLinkStateName.showTreePreview,
        action: 'Preview',
        subject: 'Node',
        icon: { icon: 'tabler-list-tree' },

        // to: 'forms-slider',
      },
    ],
  },
  {
    title: 'settings',
    icon: { icon: 'tabler-settings' },
  },
]
