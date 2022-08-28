/* eslint-disable camelcase */
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/th'

// material-tailwind

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid
} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import EmployeeEdit from './EmployeeEdit'

// ----------------------------------------------------------------------
CheckOrderMoreMenu.propTypes = {
  id: PropTypes.string,
  order_partner_total: PropTypes.number,
  order_partner_status: PropTypes.string
}
const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

export default function CheckOrderMoreMenu({ row, findEmployees }) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDetail, setOpenDetail] = useState(false)
  const [showDrawerEdit, setDrawerEdit] = useState(false)
  const [isProducts, setProducts] = useState([])

  const showEdit = async () => {
    setIsOpen(false)
    setDrawerEdit(true)
  }

  return (
    <>
      <>
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <Icon icon='ic:round-filter-list' />
        </IconButton>

        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: '100%' }
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon='icon-park-outline:view-grid-detail' width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary='แก้ไข' primaryTypographyProps={{ variant: 'body2' }} onClick={() => showEdit()} />
          </MenuItem>
        </Menu>
        <EmployeeEdit
          showDrawerEdit={showDrawerEdit}
          setDrawerEdit={setDrawerEdit}
          row={row}
          findEmployees={findEmployees}
        />
      </>
    </>
  )
}
