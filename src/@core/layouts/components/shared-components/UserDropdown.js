/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

// ** Next Import
import { useRouter, Link } from 'next/router'
import { signOut } from 'next-auth/react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

// component
import ChangeBranch from './ChangeBranch'
import DialogDisplay from './DialogDisplay'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  const { data: session } = useSession()

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [isBranch, setBranch] = useState()
  const [isOpenDisplay, setOpenDisplay] = useState(false)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url === '/signin/') {
      localStorage.removeItem('branch')
      signOut()
    } else if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleDisplay = url => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  useEffect(() => {
    funcGetBranch()
  }, [session])

  const funcGetBranch = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `Bearer ${localStorage.getItem('token')}`
      }
    }

    const isBranchid = localStorage.getItem('branch')
    await axios(`${process.env.NEXT_PUBLIC_POS_BACKEND}/branch/${isBranchid}`, config).then(res =>
      setBranch(res.data.data)
    )
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={isBranch && `${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isBranch.branch_image}`}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 330, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar
                alt='John Doe'
                src={isBranch && `${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isBranch.branch_image}`}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{session?.user.name}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {session?.user.type_detail === 'owner' ? 'เจ้าของกิจการ' : session?.user.type_detail}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/menu/createBarcode/')}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            สร้างบาร์โค้ต
          </Box>
        </MenuItem>
        <ChangeBranch funcGetBranch={funcGetBranch} />

        <MenuItem
          sx={{ p: 0 }}
          onClick={() => {
            setAnchorEl(null)
            setOpenDisplay(true)
          }}
        >
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            หน้าจอฝั่งลูกค้า
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/signin/')}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>
      <DialogDisplay isOpenDisplay={isOpenDisplay} setOpenDisplay={setOpenDisplay} />
    </Fragment>
  )
}

export default UserDropdown
