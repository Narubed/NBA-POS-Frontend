/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn } from 'next-auth/react'
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

import Main from '../../../src/components/auth/pages/main'
import Scrollbar from '../../../src/components/utils/Scrollbar'
import SearchNotFound from '../../../src/components/utils/SearchNotFound'
import ListHead from '../../../src/components/utils/ListHead'

// Component
import ProductListToolbar from '../../../src/components/pages/stock/product/ProductListToolbar'
import ProductMoreMenu from '../../../src/components/pages/stock/product/ProductMoreMenu'
import ProductCreate from '../../../src/components/pages/stock/product/ProductCreate'

// images
import imagesicon from '../../../public/images/products/NoImage.png'

// loading
import { loading } from '../../../src/store/actions'

const TABLE_HEAD = [
  { id: 'product_id', label: 'ไอดี', alignRight: false },
  { id: 'product_name', label: 'ชื่อสินค้า', alignRight: true },
  { id: 'product_cost', label: 'ราคาต้นทุน', alignRight: false },
  { id: 'product_price', label: 'ราคาขาย', alignRight: false },
  { id: 'product_unit_store', label: 'คงเหลือในสต๊อก', alignRight: false },
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
        _user._id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.product_id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.product_name.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

export default function Component() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  const [isProductList, setProductList] = useState([])
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

  useEffect(async () => {
    dispatch(loading(true))
    const isBranch = localStorage.getItem('branch')

    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_POS_BACKEND}/products/branch/${isBranch}`)
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

      // const newSelectedsid = Orderlist.map((n) => n.order_id);
      setSelected(newSelecteds)

      // setSelected_id(newSelectedsid);
      return
    }
    setSelected([])
    setSelected_id([])
  }

  const onResetFilter = () => {
    setProductFilter(null)
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
    const filterStatus = isProductList.filter(value => value.product_type === e)
    if (filterStatus.length !== 0) {
      setProductListFilter(filterStatus)
    }
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isProductList.length) : 0
  const filteredList = applySortFilter(isProductList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredList.length === 0

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4' gutterBottom>
          <div>สินค้าทั้งหมด</div>
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
          เพิ่มสินค้าใหม่
        </Button>
      </Stack>
      <ProductCreate showDrawerCreate={showDrawerCreate} setDrawerCreate={setDrawerCreate} />
      <Card>
        <ProductListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selected={selected}
          onChangeStatus={onChangeStatus}
          onResetFilter={onResetFilter}
          selected_id={selected_id}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
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
                  const {
                    _id,
                    product_id,
                    product_type,
                    product_name,
                    product_cost,
                    product_price,
                    product_image,
                    product_unit_store
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
                            <div className=' font-light text-xs'>{product_type}</div>
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align='center'>{product_name}</TableCell>
                      <TableCell align='left'>{numeral(product_cost).format('0,0')}</TableCell>
                      <TableCell align='left'>{numeral(product_price).format('0,0')}</TableCell>
                      <TableCell align='left'>{numeral(product_unit_store).format('0,0')}</TableCell>

                      <TableCell align='right'>
                        <ProductMoreMenu id={_id} isProductList={isProductList} row={row} />
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
