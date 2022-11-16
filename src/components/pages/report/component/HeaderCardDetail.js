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

import PrintInvoice from '../../dashboard/components/PrintInvoice'
import PrintInvoiceA4 from '../../dashboard/components/PrintInvoiceA4.V2'
import DialogCreateInvoice from './DialogCreateInvoice'
import router from 'next/router'
import { useSession } from 'next-auth/react'

export default function HeaderCardDetail({ row, setDialog, getAllReport }) {
  const { data: session } = useSession()
  const componentToPrint = React.useRef(null)
  const componentToPrintA4 = React.useRef(null)
  const [isOpenDialog, setOpenDialog] = React.useState(false)

  const onClickCreateInvoice = async () => {
    console.log(session)
    if (session?.user.type_detail === 'พนักงานทั่วไป') {
      setDialog(false)
    } else {
      setDialog(false)
      setOpenDialog(true)
    }
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
                  {row.report_tax_invoice_number_shot}
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
                  {row.report_make_list}
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
                  {row.report_payment_type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          {row.report_tax_invoice_number_full === 'ไม่มี' ? (
            <Card sx={{ bgcolor: '#2D99FF' }} onClick={onClickCreateInvoice}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                    เลขที่ใบเสร็จ (เต็ม)
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                    ไม่มี (คลิ๊กเพื่อสร้างใบกำกับภาษี)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            <Card sx={{ bgcolor: '#2D99FF' }} onClick={() => router.push('/report/invoice/full/')}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                    เลขที่ใบเสร็จ (เต็ม)
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                    {row.report_tax_invoice_number_full}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Card sx={{ bgcolor: '#83CFFF' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: '#FFFFFF' }}>
                  วันที่ทำรายการ
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ color: '#FFFFFF' }}>
                  {dayjs(row.report_timestamp).add(543, 'year').locale('th').format('DD MMM YYYY h:mm A')}
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
                  {numeral(row.report_discount).format('0,0.00')}
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
                  {numeral(row.report_money).format('0,0.00')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'right', p: 2 }}>
          <ReactToPrint
            trigger={() => (
              <Button
                color='info'
                variant='outlined'
                startIcon={<Icon icon='icon-park-outline:add-print' />}
                sx={{ m: 1 }}
              >
                พิมพ์ (ย่อ)
              </Button>
            )}
            content={() => componentToPrint.current}
          />

          <ReactToPrint
            trigger={() => (
              <Button variant='outlined' startIcon={<Icon icon='ic:round-print' />} sx={{ m: 1 }}>
                พิมพ์ (A4)
              </Button>
            )}
            content={() => componentToPrintA4.current}
          />
        </Grid>
      </Grid>
      <PrintInvoice componentToPrint={componentToPrint} isReport={row} />
      <PrintInvoiceA4 componentToPrintA4={componentToPrintA4} isReport={row} />
    </div>
  )
}
