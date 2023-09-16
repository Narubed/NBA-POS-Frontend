// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ArrowDownCircle from 'mdi-material-ui/ArrowDownCircle'
import ClipboardList from 'mdi-material-ui/ClipboardList'

const navigation = () => {
  return [
    {
      title: 'หน้าหลัก',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'รายงาน'
    },
    {
      title: 'แดชบอร์ด',
      icon: AccountCogOutline,
      path: '/report/dashboard'
    },
    {
      title: 'ประวัติการขาย',
      icon: AccountCogOutline,
      path: '/report'
    },
    {
      title: 'ใบกำกับภาษี(เต็ม)',
      icon: AccountCogOutline,
      path: '/report/invoice/full'
    },
    {
      title : 'รายงานการขาย',
      icon: ClipboardList,
      path: '/report/sales'
    },
    {
      sectionTitle: 'จัดการข้อมูลสินค้า'
    },
    {
      title: 'สต๊อกสินค้า',
      icon: AccountCogOutline,
      path: '/stock/product'
    },
    {
      title: 'ประวัติสินค้า',
      icon: AccountCogOutline,
      path: '/stock/productHistory'
    },

    // {
    //   title: 'สินค้า',
    //   groupActive: [
    //     {
    //       title: 'สต๊อกสินค้า',
    //       icon: AccountCogOutline,
    //       path: '/stock/product'
    //     },
    //     {
    //       title: 'ประวัติสินค้า',
    //       icon: AccountCogOutline,
    //       path: '/stock/productHistory'
    //     }
    //   ]
    // },
    {
      sectionTitle: 'จัดการข้อมูลภายในสาขา'
    },

    {
      title: 'พนักงาน',
      icon: AccountCogOutline,
      path: '/management/employee'
    },
    {
      title: 'กิจกรรม',
      icon: AccountCogOutline,
      path: '/management/activity'
    }

    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
