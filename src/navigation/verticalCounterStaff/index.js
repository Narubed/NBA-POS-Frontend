// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import StackOverflow from 'mdi-material-ui/StackOverflow'
import ClipboardTextClockOutline from 'mdi-material-ui/ClipboardTextClockOutline'
import ClipboardTextClock from 'mdi-material-ui/ClipboardTextClock'
import DatabaseArrowDown from 'mdi-material-ui/DatabaseArrowDown'
import History from 'mdi-material-ui/History'
import CardAccountDetails from 'mdi-material-ui/CardAccountDetails'
import ShieldAlert from 'mdi-material-ui/ShieldAlert'

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
    }
  ]
}

export default navigation
