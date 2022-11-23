// ** MUI Imports
import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from '../@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from '../navigation/vertical'
import VerticalNavItemsCounter from '../navigation/verticalCounterStaff'
import verticalNavItemsEmployee from '../navigation/verticalEmployee'

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import LoadingPage from './LoadingPage'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

import { addItem, loading } from '../store/actions'

const UserLayout = ({ children }) => {
  const { data: session } = useSession()

  const dispatch = useDispatch()
  useEffect(() => {
    const item = localStorage.getItem('shopping')
    console.log("IS ITEM", item)
    if (item !== null) {
      console.log("ดขเา item")
      dispatch(addItem(JSON.parse(item)))
    }
  }, [])

  if (session) {
    const { expires } = session
    if (dayjs(expires).format() < dayjs(Date.now()).format()) {
      localStorage.removeItem('branch')
      Swal.fire({
        icon: 'error',
        title: 'หมดเวลาใช้งาน กรุณาเข้าสู่ระบบใหม่',
        showConfirmButton: false,
        timer: 1500
      })
      signOut()
    }
  }

  // if ()signOut

  const { settings, saveSettings } = useSettings()

  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  let checkType = null
  if (session?.user.type_detail === 'owner' || session?.user.type_detail === 'ผู้จัดการ') {
    checkType = VerticalNavItems()
  } else if (session?.user.type_detail === 'พนักงานเคาน์เตอร์') {
    checkType = VerticalNavItemsCounter()
  } else if (session?.user.type_detail === 'พนักงานทั่วไป') {
    checkType = verticalNavItemsEmployee()
  }

  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <a target='_blank' rel='noreferrer' href='https://nbadigitalservice.com/'>
          <img
            width={230}
            alt='upgrade to premium'
            src={`https://foodexpress.nbadigitalservice.com/static/illustrations/icon%2001-04.png`}
          />
        </a>
      </Box>
    )
  }

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={checkType} // Navigation Items
      afterVerticalNavMenuContent={UpgradeToProImg}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
      <LoadingPage />
      <UpgradeToProButton />
    </VerticalLayout>
  )
}

export default UserLayout
