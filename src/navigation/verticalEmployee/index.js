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
      title: 'ประวัติการขาย',
      icon: AccountCogOutline,
      path: '/report'
    }
  ]
}

export default navigation
