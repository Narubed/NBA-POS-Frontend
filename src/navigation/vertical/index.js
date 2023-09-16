// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import StackOverflow from 'mdi-material-ui/StackOverflow'
import ClipboardTextClockOutline from 'mdi-material-ui/ClipboardTextClockOutline'
import ClipboardTextClock from 'mdi-material-ui/ClipboardTextClock'
import DatabaseArrowDown from 'mdi-material-ui/DatabaseArrowDown'
import History from 'mdi-material-ui/History'
import CardAccountDetails from 'mdi-material-ui/CardAccountDetails'
import ShieldAlert from 'mdi-material-ui/ShieldAlert'
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
      icon: StackOverflow,
      path: '/report/dashboard'
    },
    {
      title: 'ประวัติการขาย',
      icon: ClipboardTextClockOutline,
      path: '/report'
    },
    {
      title: 'ใบกำกับภาษี(เต็ม)',
      icon: ClipboardTextClock,
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
      icon: DatabaseArrowDown,
      path: '/stock/product'
    },
    {
      title: 'ประวัติสินค้า',
      icon: History,
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
      icon: CardAccountDetails,
      path: '/management/employee'
    },
    {
      title: 'กิจกรรม',
      icon: ShieldAlert,
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
