/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { filter } from 'lodash'
import numeral from 'numeral'
import dayjs from 'dayjs'
import 'dayjs/locale/th'

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
    IconButton,
    Card,
    TablePagination,
    TextField,
    Box,
    Grid,
    Chip
} from '@mui/material'
import axios from 'axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

import Main from '../../../src/components/auth/pages/main'
import Scrollbar from '../../../src/components/utils/Scrollbar'
import SearchNotFound from '../../../src/components/utils/SearchNotFound'
import ListHead from '../../../src/components/utils/ListHead'

// Component
import ReportListToolbar from '../../../src/components/pages/sales/ReportListToolbar'

// import ShowDetailReport from '../../../src/components/pages/InvoiceFull/ShowDetailReport'

// loading
import { loading } from '../../../src/store/actions'

const TABLE_HEAD = [
    { id: 'index', label: 'ลำดับ', alignRight: true },
    { id: 'product_id', label: 'Barcode', alignRight: false },
    { id: 'product_type', label: 'ประเภทสินค้า', alignRight: false },
    { id: 'product_name', label: 'ชื่อรายการ', alignRight: true },
    { id: 'product_cost', label: 'ต้นทุน/ชิ้น', alignRight: true },
    { id: 'product_price', label: 'ราคาขาย/ชิ้น', alignRight: false },
    { id: 'product_discount', label: 'ส่วนลดรวม', alignRight: false },
    { id: 'amount', label: 'จำนวน', alignRight: true },
    { id: '', label: 'รวม', alignRight: true },
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
                _user.product_type.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                _user.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
    }

    return stabilizedThis.map(el => el[0])
}



export default function Component() {

    const dispatch = useDispatch()
    const router = useRouter()

    const { data: session } = useSession()
    if (!session) return <Main signIn={signIn} />




    const [isReportList, setReportList] = useState([])
    const [page, setPage] = useState(0)
    const [order, setOrder] = useState('asc')
    const [selected, setSelected] = useState([])
    // eslint-disable-next-line camelcase
    const [orderBy, setOrderBy] = useState('name')
    const [filterName, setFilterName] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isDateStart, setDateStart] = React.useState(new Date())
    const [isDateEnd, setDateEnd] = React.useState(new Date())

    useEffect(() => {
        getAllReport()
    }, [])

    useEffect(() => {
        if (session) {
            if (session.user.type_detail.toString() === 'พนักงานทั่วไป') {
                signOut()
            }
        }
    }, [])

    const getAllReport = async () => {
        dispatch(loading(true))
        const isBranch = localStorage.getItem('branch')

        const config = {
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_POS_BACKEND}/sales/branch`,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                branch_id: isBranch,
                date_start: dayjs(isDateStart).format("YYYY-MM-DD"),
                date_end: dayjs(isDateEnd).format("YYYY-MM-DD")
            }
        }

        const getReport = await axios(config)
        console.log(getReport.data.data)
        if (getReport || getReport.data.data) {
            const reverseReport = getReport.data.data
            setReportList(reverseReport)
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
            setSelected(newSelecteds)
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

    const headleSearch = async () => {
        await getAllReport()
    }
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isReportList.length) : 0
    const filteredList = applySortFilter(isReportList, getComparator(order, orderBy), filterName)

    const isUserNotFound = filteredList.length === 0

    return (
        <>
            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
                <Typography variant='h5' gutterBottom>
                    <div>รายงานการขาย</div>
                </Typography>
            </Stack>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} display='flex'>
                <Grid xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <MobileDatePicker
                                label='วันที่เริ่ม'
                                value={isDateStart}
                                onChange={newValue => {
                                    setDateStart(newValue)
                                }}
                                renderInput={params => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Grid>
                <Grid xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <MobileDatePicker
                                label='วันสุดท้าย'
                                value={isDateEnd}
                                onChange={newValue => {
                                    setDateEnd(newValue)
                                }}
                                renderInput={params => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Grid>
                
                <Button
                    variant="outlined"
                    onClick={headleSearch}
                >
                    ค้นหา
                </Button>
            </Grid>
            <Card>
                <ReportListToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    rows={isReportList}
                    isDateStart={isDateStart}
                    isDateEnd={isDateEnd}
                />
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <ListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={isReportList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    const {
                                        _id,
                                        product_id,
                                        product_name,
                                        product_cost,
                                        product_price,
                                        product_discount,
                                        product_type,
                                        amount
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
                                            <TableCell align='center'>{index + 1}</TableCell>
                                            <TableCell align='left'>{product_id}</TableCell>
                                            <TableCell align='left'>{product_type}</TableCell>
                                            <TableCell align='center'>{product_name}</TableCell>
                                            <TableCell align='center'>{numeral(product_cost).format('0,0.00')}</TableCell>
                                            <TableCell align='left'>{numeral(product_price).format('0,0.00')}</TableCell>
                                            <TableCell align='left'>{numeral(product_discount).format('0,0.00')}</TableCell>
                                            <TableCell align='center'>{numeral(amount).format('0,0.00')}</TableCell>
                                            <TableCell align='center'>{numeral(amount * product_price - product_discount).format('0,0.00')}</TableCell>
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
