import React from 'react'
import ReactToPrint from 'react-to-print'
import numeral from 'numeral'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { Icon } from '@iconify/react'
import { styled, useTheme } from '@mui/material/styles'
import {
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid
} from '@mui/material'

import PrintInvoiceFullA4 from './PrintInvoiceFullA4'
import DialogCreateInvoice from './DialogCreateInvoice'
import router from 'next/router'

export default function HeaderCardDetail({ row, setDialog, getAllReport }) {
  const componentToPrintFullA4 = React.useRef(null)
  const [isOpenDialog, setOpenDialog] = React.useState(false)

  const onClickCreateInvoice = async () => {
    setDialog(false)
    setOpenDialog(true)
  }

  return (
    <div>
      {row && (
        <DialogCreateInvoice
          row={row}
          isOpenDialog={isOpenDialog}
          setOpenDialog={setOpenDialog}
          getAllReport={getAllReport}
        />
      )}

      <Grid container spacing={1}>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#826AF9' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                  เลขที่ใบเสร็จ (ย่อ)
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                  {row.rif_tax_invoice_number_shot}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#9E86FF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                  พนักงาน
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                  {row.rif_make_list}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#D0AEFF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#000000' }}>
                  ลูกค้า
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#000000' }}>
                  ทั่วไป
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#F7D2FF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#000000' }}>
                  ประเภทการชำระ
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#000000' }}>
                  {row.rif_payment_type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#2D99FF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                  เลขที่ใบเสร็จ (เต็ม)
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                  {row.rif_tax_invoice_number_full}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#83CFFF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                  วันที่ทำรายการ
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                  {dayjs(row.rif_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY h:mm A')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#A5F3FF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#000000' }}>
                  ส่วนลดท้ายบิล
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#000000' }}>
                  {numeral(row.rif_discount).format('0,0.00')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#CCFAFF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#000000' }}>
                  ยอดเงินที่รับ
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#000000' }}>
                  {numeral(row.rif_money).format('0,0.00')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'right', p: 2 }}>
          <ReactToPrint
            trigger={() => (
              <Button variant='outlined' startIcon={<Icon icon='ic:round-print' />} sx={{ m: 1 }}>
                พิมพ์ (A4)
              </Button>
            )}
            content={() => componentToPrintFullA4.current}
          />
        </Grid>
      </Grid>
      <PrintInvoiceFullA4 componentToPrintFullA4={componentToPrintFullA4} isReport={row} />
    </div>
  )
}
