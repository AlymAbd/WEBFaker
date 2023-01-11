import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBook,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const t = global.$t

const _nav = [
  {
    component: CNavItem,
    name: t('Dashboard'),
    to: '/cabinet/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: t('My space'),
  },
  {
    component: CNavItem,
    name: t('My courses'),
    to: '/cabinet/my_courses',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: t('My orders'),
    to: '/cabinet/my_orders',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: t('Manage'),
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: t('Agreements'),
        to: '/cabinet/agreements',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: t('Courses'),
        to: '/cabinet/course',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: t('Category courses'),
        to: '/cabinet/course/category',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: t('Course prices'),
        to: '/cabinet/course/prices',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: t('Users'),
        to: '/cabinet/users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
    ],
  },
]

// const _nav = [
//   {
//     component: CNavItem,
//     name: 'Dashboard',
//     to: '/cabinet/dashboard',
//     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     },
//   },
//   {
//     component: CNavTitle,
//     name: 'Theme',
//   },
//   {
//     component: CNavItem,
//     name: 'Colors',
//     to: '/cabinet/theme/colors',
//     icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavItem,
//     name: 'Typography',
//     to: '/cabinet/theme/typography',
//     icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavTitle,
//     name: 'Components',
//   },
//   {
//     component: CNavGroup,
//     name: 'Base',
//     to: '/cabinet/base',
//     icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Accordion',
//         to: '/cabinet/base/accordion',
//       },
//       {
//         component: CNavItem,
//         name: 'Breadcrumb',
//         to: '/cabinet/base/breadcrumbs',
//       },
//       {
//         component: CNavItem,
//         name: 'Cards',
//         to: '/cabinet/base/cards',
//       },
//       {
//         component: CNavItem,
//         name: 'Carousel',
//         to: '/cabinet/base/carousels',
//       },
//       {
//         component: CNavItem,
//         name: 'Collapse',
//         to: '/cabinet/base/collapses',
//       },
//       {
//         component: CNavItem,
//         name: 'List group',
//         to: '/cabinet/base/list-groups',
//       },
//       {
//         component: CNavItem,
//         name: 'Navs & Tabs',
//         to: '/cabinet/base/navs',
//       },
//       {
//         component: CNavItem,
//         name: 'Pagination',
//         to: '/cabinet/base/paginations',
//       },
//       {
//         component: CNavItem,
//         name: 'Placeholders',
//         to: '/cabinet/base/placeholders',
//       },
//       {
//         component: CNavItem,
//         name: 'Popovers',
//         to: '/cabinet/base/popovers',
//       },
//       {
//         component: CNavItem,
//         name: 'Progress',
//         to: '/cabinet/base/progress',
//       },
//       {
//         component: CNavItem,
//         name: 'Spinners',
//         to: '/cabinet/base/spinners',
//       },
//       {
//         component: CNavItem,
//         name: 'Tables',
//         to: '/cabinet/base/tables',
//       },
//       {
//         component: CNavItem,
//         name: 'Tooltips',
//         to: '/cabinet/base/tooltips',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Buttons',
//     to: '/cabinet/buttons',
//     icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Buttons',
//         to: '/cabinet/buttons/buttons',
//       },
//       {
//         component: CNavItem,
//         name: 'Buttons groups',
//         to: '/cabinet/buttons/button-groups',
//       },
//       {
//         component: CNavItem,
//         name: 'Dropdowns',
//         to: '/cabinet/buttons/dropdowns',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Forms',
//     icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Form Control',
//         to: '/cabinet/forms/form-control',
//       },
//       {
//         component: CNavItem,
//         name: 'Select',
//         to: '/cabinet/forms/select',
//       },
//       {
//         component: CNavItem,
//         name: 'Checks & Radios',
//         to: '/cabinet/forms/checks-radios',
//       },
//       {
//         component: CNavItem,
//         name: 'Range',
//         to: '/cabinet/forms/range',
//       },
//       {
//         component: CNavItem,
//         name: 'Input Group',
//         to: '/cabinet/forms/input-group',
//       },
//       {
//         component: CNavItem,
//         name: 'Floating Labels',
//         to: '/cabinet/forms/floating-labels',
//       },
//       {
//         component: CNavItem,
//         name: 'Layout',
//         to: '/cabinet/forms/layout',
//       },
//       {
//         component: CNavItem,
//         name: 'Validation',
//         to: '/cabinet/forms/validation',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Charts',
//     to: '/cabinet/charts',
//     icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavGroup,
//     name: 'Icons',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'CoreUI Free',
//         to: '/cabinet/icons/coreui-icons',
//         badge: {
//           color: 'success',
//           text: 'NEW',
//         },
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Flags',
//         to: '/cabinet/icons/flags',
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Brands',
//         to: '/cabinet/icons/brands',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Notifications',
//     icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Alerts',
//         to: '/cabinet/notifications/alerts',
//       },
//       {
//         component: CNavItem,
//         name: 'Badges',
//         to: '/cabinet/notifications/badges',
//       },
//       {
//         component: CNavItem,
//         name: 'Modal',
//         to: '/cabinet/notifications/modals',
//       },
//       {
//         component: CNavItem,
//         name: 'Toasts',
//         to: '/cabinet/notifications/toasts',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Widgets',
//     to: '/cabinet/widgets',
//     icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     },
//   },
//   {
//     component: CNavTitle,
//     name: 'Extras',
//   },
//   {
//     component: CNavGroup,
//     name: 'Pages',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Login',
//         to: '/login',
//       },
//       {
//         component: CNavItem,
//         name: 'Register',
//         to: '/register',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 404',
//         to: '/404',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 500',
//         to: '/500',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Docs',
//     href: 'https://coreui.io/react/docs/templates/installation/',
//     icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
//   },
// ]

export default _nav
