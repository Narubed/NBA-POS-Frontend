/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn } from 'next-auth/react'
import { Icon } from '@iconify/react'
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
  Container,
  Card,
  TablePagination
} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import Image from 'next/image'

// images
import imagesicon from '../../../../../../public/images/products/NoImage.png'
import bubble from '../../../../../../public/images/Background/history/bubble2.png'

// loading
import { loading } from '../../../../../../src/store/actions'

import SearchNotFound from '../../../../utils/SearchNotFound'
import Scrollbar from '../../../../utils/Scrollbar'
import ListHead from '../../../../utils/ListHead'
import ListToolbar from '../../../../utils/ListToolbar'

const TABLE_HEAD = [
  { id: 'product_id', label: 'ไอดี', alignRight: false },
  { id: 'product_unit_store', label: 'คงเหลือในสต๊อก', alignRight: true },
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
        _user.product_id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.product_name.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}


export default function Component({ findProducthistory, isSelectedProduct }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [isProductList, setProductList] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': `Bearer ${localStorage.getItem('token')}`
    }
  }
  useEffect(async () => {
    dispatch(loading(true))
    const isBranch = localStorage.getItem('branch')

    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/branch/${isBranch}`,config)
    if (getProducts || getProducts.data.data) {
      const reverseProducts = getProducts.data.data.reverse()
      setProductList(reverseProducts)
    }

    dispatch(loading(false))
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = Orderlist.map(n => n._id)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isProductList.length) : 0
  const filteredList = applySortFilter(isProductList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredList.length === 0

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h6' gutterBottom>
          <div>สินค้าทั้งหมด</div>
        </Typography>
      </Stack>
      {/* <ProductCreate showDrawerCreate={showDrawerCreate} setDrawerCreate={setDrawerCreate} /> */}
      <Card
        sx={{
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundImage: `url(${bubble.src})`
        }}
      >
        <ListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selected={selected}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 360 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={isProductList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  const { _id, product_id, product_name, product_image, product_unit_store } = row
                  const isItemSelected = selected.indexOf(_id) !== -1

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role='checkbox'
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      onClick={() => findProducthistory(row)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        {' '}
                        {isSelectedProduct && isSelectedProduct._id === row._id && <Icon icon='emojione:eye' />}
                      </TableCell>
                      <TableCell component='th' scope='row' padding='none'>
                        <Stack direction='row' alignItems='center' spacing={2}>
                          {product_image === 'ไม่มี' ? (
                            <img src={imagesicon.src} alt='Picture of the author' width={40} height={40} />
                          ) : (
                            <img
                              src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${product_image}`}
                              alt='Picture of the author'
                              width={40}
                              height={40}
                            />
                          )}
                          <Typography variant='subtitle2' noWrap>
                            <div className='text-orange-200'>{product_id}</div>
                            <div className=' font-light text-xs'>{product_name}</div>
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align='center'>
                        {product_unit_store > 0 ? (
                          <a>{numeral(product_unit_store).format('0,0')}</a>
                        ) : (
                          <a style={{ color: 'red' }}>{numeral(product_unit_store).format('0,0')}</a>
                        )}
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
          rowsPerPageOptions={[5, 10, 25]}
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
