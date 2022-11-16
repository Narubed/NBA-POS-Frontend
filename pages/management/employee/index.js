/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { filter } from 'lodash'
import numeral from 'numeral'

// material
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Card,
  TablePagination,
  Switch
} from '@mui/material'
import axios from 'axios'

import Main from '../../../src/components/auth/pages/main'
import Scrollbar from '../../../src/components/utils/Scrollbar'
import SearchNotFound from '../../../src/components/utils/SearchNotFound'
import ListHead from '../../../src/components/utils/ListHead'

// Component
import EmployeeListToolbar from '../../../src/components/pages/menagement/employee/EmployeeListToolbar'
import EmployeeMoreMenu from '../../../src/components/pages/menagement/employee/EmployeeMoreMenu'
import EmployeeCreate from '../../../src/components/pages/menagement/employee/EmployeeCreate'

// images
import imagesicon from '../../../public/images/products/NoImage.png'

// loading
import { loading } from '../../../src/store/actions'

const TABLE_HEAD = [
  { id: 'employee_name', label: 'รายละเอียด', alignRight: false },
  { id: 'employee_phone', label: 'เบอร์โทรศัพท์', alignRight: true },
  { id: 'employee_type', label: 'ตำเเหน่ง', alignRight: true },
  { id: 'employee_status', label: 'สถานะ', alignRight: true },
  { id: '' }
]
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      _user =>
        _user.employee_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.employee_email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.employee_type.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.employee_phone.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

export default function Component() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: session } = useSession()
  if (!session) {
    return <Main signIn={signIn} />
  }

  useEffect(() => {
    if (session) {
      if (
        session.user.type_detail.toString() === 'พนักงานทั่วไป' ||
        session.user.type_detail.toString() === 'พนักงานเคาน์เตอร์'
      ) {
        signOut()
      }
    }
  }, [])

  const [isEmployeeList, setEmployeeList] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  // eslint-disable-next-line camelcase
  const [selected_id, setSelected_id] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isProductFilter, setProductFilter] = useState(null)
  const [showDrawerCreate, setDrawerCreate] = useState(false)

  useEffect(() => {
    findEmployees()
  }, [])

  const findEmployees = async () => {
    dispatch(loading(true))
    const isBranch = localStorage.getItem('branch')
    const getEmployee = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/employee/branch/${isBranch}`)
    if (getEmployee || getEmployee.data.data) {
      const reverseEmployee = getEmployee.data.data.reverse()
      setEmployeeList(reverseEmployee)
    }

    dispatch(loading(false))
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = Orderlist.map(n => n._id)

      // const newSelectedsid = Orderlist.map((n) => n.order_id);
      setSelected(newSelecteds)

      // setSelected_id(newSelectedsid);
      return
    }
    setSelected([])
    setSelected_id([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = event => {
    setFilterName(event.target.value)
  }

  const onChangeStatus = e => {
    const filterStatus = isEmployeeList.filter(value => value.product_type === e)
    if (filterStatus.length !== 0) {
      setProductListFilter(filterStatus)
    }
  }

  const onChangeSwitchStatus = async event => {
    dispatch(loading(true))
    await axios.put(`${process.env.NEXT_PUBLIC_POS_BACKEND}/employee/${event.row._id}`, {
      employee_status: event.e.target.checked
    })
    await findEmployees()
    dispatch(loading(false))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isEmployeeList.length) : 0
  const filteredList = applySortFilter(isEmployeeList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredList.length === 0

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4' gutterBottom>
          <div>พนักงานทั้งหมด</div>
        </Typography>
        <Button
          onClick={() => setDrawerCreate(true)}
          variant='contained'
          sx={{
            transition: '.2s transform ease-in-out',
            borderRadius: '15px',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          เพิ่มพนักงานใหม่
        </Button>
      </Stack>
      <EmployeeCreate
        showDrawerCreate={showDrawerCreate}
        setDrawerCreate={setDrawerCreate}
        findEmployees={findEmployees}
      />
      <Card>
        <EmployeeListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={isEmployeeList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  const {
                    _id,
                    employee_name,
                    employee_email,
                    employee_phone,
                    employee_type,
                    employee_status,
                    employee_image
                  } = row
                  const isItemSelected = selected.indexOf(_id) !== -1

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role='checkbox'
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding='checkbox' />
                      <TableCell component='th' scope='row' padding='none'>
                        <Stack direction='row' alignItems='center' spacing={2}>
                          {employee_image === 'ไม่มี' ? (
                            <img src={imagesicon.src} alt='Picture of the author' width={40} height={40} />
                          ) : (
                            <img
                              src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${employee_image}`}
                              alt='Picture of the author'
                              width={40}
                              height={40}
                            />
                          )}

                          <Typography variant='subtitle2' noWrap>
                            <div className='text-orange-200'>{employee_name}</div>
                            <div className=' font-light text-xs'>{employee_email}</div>
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align='center'>{employee_phone}</TableCell>
                      <TableCell align='center'>{employee_type}</TableCell>
                      <TableCell align='center'>
                        <FormControlLabel
                          control={<Switch checked={employee_status} />}
                          defaultValue={employee_status}
                          label={employee_status ? 'ออนไลน์' : 'ออฟไลน์'}
                          onChange={e => onChangeSwitchStatus({ e, row })}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <EmployeeMoreMenu
                          id={_id}
                          isEmployeeList={isEmployeeList}
                          row={row}
                          findEmployees={findEmployees}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component='div'
          count={filteredList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  )
}
