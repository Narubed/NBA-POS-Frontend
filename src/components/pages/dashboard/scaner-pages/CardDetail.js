import * as React from 'react'
import numeral from 'numeral'
import Table from '@mui/material/Table'
import { Icon } from '@iconify/react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import IconButton from '@mui/material/IconButton'

import { useDispatch, useSelector } from 'react-redux'

import DialogNoteProductScaner from '../lib/DialogNoteProductScaner'
import DialogButtonAmount from '../lib/DialogButtonAmount'

export default function DenseTable({ deleteProduct, changeAmountOrder }) {
  const valueListProduct = useSelector(state => state.list)
  const [value, setValue] = React.useState(0)
  const [openButtonAmount, setButtonAmount] = React.useState(false)
  const [isProductOnClick, setProductOnClick] = React.useState()

  const onClickDeleteProduct = async row => {
    const item = row
    await deleteProduct({ item })
  }

  const addAmountProduct = async (event, row) => {
    setProductOnClick(row)
    event.stopPropagation()
    setButtonAmount(true)
  }

  const setChangeAmount = async value => {
    const newAmount = 0
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      const item = isProductOnClick
      await deleteProduct({ item })
    } else {
      newAmount = parseFloat(value)
      const newItem = { ...isProductOnClick, amount: parseFloat(newAmount) }
      changeAmountOrder(newItem)
    }
  }

  return (
    <>
      <>
        <DialogButtonAmount
          openButtonAmount={openButtonAmount}
          setButtonAmount={setButtonAmount}
          setChangeAmount={setChangeAmount}
        />
      </>
      <TableContainer component={Paper} sx={{ pt: 10 }}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>รหัส</TableCell>
              <TableCell align='right'>ชื่อสินค้า</TableCell>
              <TableCell align='right'>คงเหลือ</TableCell>
              <TableCell align='right'>ราคา/หน่วย</TableCell>
              <TableCell align='right'>จำนวน</TableCell>
              <TableCell align='right'>ส่วนลด</TableCell>
              <TableCell align='right'>ราคารวม</TableCell>
              <TableCell align='center'>จัดการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {valueListProduct &&
              valueListProduct.length !== 0 &&
              valueListProduct.length !== undefined &&
              valueListProduct.map(row => (
                <>
                  <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.product_id}
                    </TableCell>
                    <TableCell align='right'>
                      {' '}
                      {row.product_note !== 'ไม่มี' && (
                        <a style={{ fontSize: '10px', color: 'red' }}> ({row.product_note})</a>
                      )}
                      {row.product_name}
                    </TableCell>
                    <TableCell align='right'>{numeral(row.product_unit_store - row.amount).format('0,0')}</TableCell>

                    <TableCell align='right'>{numeral(row.product_price).format('0,0.00')}</TableCell>

                    <TableCell align='right'>
                      {' '}
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='span'
                        sx={{ m: 1, p: 0, fontSize: '100%' }}
                        onClick={event => addAmountProduct(event, row)}
                      >
                        {numeral(row.amount).format('0,0')}
                      </IconButton>
                    </TableCell>
                    <TableCell align='right'>{numeral(row.product_discount).format('0,0.00')}</TableCell>
                    <TableCell align='right'>
                      {row.product_discount > 0 ? (
                        <>
                          <div style={{ color: 'red', textDecoration: 'line-through', fontSize: '60%' }}>
                            {' '}
                            {numeral(row.product_price * row.amount).format('0,0.00')}
                          </div>
                          <a>{numeral(row.product_price * row.amount - row.product_discount).format('0,0.00')}</a>
                        </>
                      ) : (
                        <a>{numeral(row.product_price * row.amount).format('0,0.00')}</a>
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      {' '}
                      <Box>
                        <BottomNavigation
                          showLabels
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue)
                          }}
                        >
                          <DialogNoteProductScaner row={row} />

                          <IconButton
                            color='secondary'
                            aria-label='add an alarm'
                            onClick={() => onClickDeleteProduct(row)}
                          >
                            <Icon icon='icon-park-outline:delete-five' color='pink' />
                          </IconButton>
                        </BottomNavigation>
                      </Box>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
