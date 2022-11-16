import * as React from 'react'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import numeral from 'numeral'

import ReactToPrint from 'react-to-print'

import PrintInvoice from '../components/PrintInvoice'
import PrintInvoiceA4 from '../components/PrintInvoiceA4.V2'

export default function DialogSelectPrint({ isSelectPrint, setSelectPrint, isReport }) {
  const componentToPrint = React.useRef(null)
  const componentToPrintA4 = React.useRef(null)
  const [isLoadingButton, setLoadingButton] = React.useState(false)

  const handleClose = () => {
    setSelectPrint(false)
  }

  const handleSetLoading = () => {
    setLoadingButton(true)
    setTimeout(() => {
      setLoadingButton(false)
    }, 6000)
  }

  return (
    <div>
      <Dialog
        open={isSelectPrint}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' sx={{ m: 0, p: 2 }}>
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<a style={{ fontSize: '12px' }}>พิมพ์อัตโนมัติ</a>}
            />
          </FormGroup> */}
        </DialogTitle>
        <Grid sx={{ display: 'flex', textAlign: 'center', m: 'auto', fontSize: '28px' }}>
          เงินทอน : {isReport && numeral(isReport.report_money - isReport.report_grand_total).format('0,0.00')}
        </Grid>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <List sx={{ pt: 0 }} onClick={() => handleSetLoading(true)}>
              <LoadingButton
                loading={isLoadingButton}
                loadingPosition='end'
                onClick={() => setLoadingButton(true)}
                autoFocus
              >
                <ReactToPrint
                  trigger={() => (
                    <ListItem button sx={{ borderRadius: '15px' }}>
                      <ListItemAvatar>
                        <Avatar>
                          <Icon icon='flat-color-icons:print' width='30px' />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary='พิมพ์ใบเสร็จ' />
                    </ListItem>
                  )}
                  content={() => componentToPrint.current}
                />
              </LoadingButton>
              <br />
              <LoadingButton loading={isLoadingButton} loadingPosition='end' onClick={() => setLoadingButton(true)}>
                <ReactToPrint
                  trigger={() => (
                    <ListItem button sx={{ borderRadius: '15px' }}>
                      <ListItemAvatar>
                        <Avatar>
                          <Icon icon='noto-v1:printer' width='30px' />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary='พิมพ์ใบเสร็จ A4' />
                    </ListItem>
                  )}
                  content={() => componentToPrintA4.current}
                />
              </LoadingButton>

              {/* <ListItem autoFocus button sx={{ borderRadius: '15px' }}>
                <ListItemAvatar>
                  <Avatar>
                    <Icon icon='flat-color-icons:broken-link' width='30px' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='สร้างใบกำกับภาษี' />
              </ListItem>
              <ListItem autoFocus button sx={{ borderRadius: '15px' }}>
                <ListItemAvatar>
                  <Avatar>
                    <Icon icon='fa-regular:save' width='30px' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='บันทึกรูปภาพ' />
              </ListItem> */}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ReactToPrint
            trigger={() => <Button autoFocus>พิมพ์อัตโนมัติ</Button>}
            content={() => componentToPrint.current}
          />

          <Button onClick={handleClose}>ออก</Button>
        </DialogActions>
      </Dialog>
      <PrintInvoice componentToPrint={componentToPrint} isReport={isReport} />
      <PrintInvoiceA4 componentToPrintA4={componentToPrintA4} isReport={isReport} />
    </div>
  )
}
