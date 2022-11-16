// ** MUI Imports
import { useRouter } from 'next/router'

import { Button, CardActionArea, CardActions, CardContent, Typography, Avatar, Card, Box } from '@mui/material'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import Twitter from 'mdi-material-ui/Twitter'
import ShareVariant from 'mdi-material-ui/ShareVariant'

const CardStock = ({ isBranch }) => {
  const router = useRouter()

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#0001ff' }}>
      <CardActionArea onClick={() => router.push('/report/invoice/full/')}>
        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              marginBottom: 2.75,
              alignItems: 'center',
              color: 'common.white',
              justifyContent: 'center'
            }}
          >
            {/* <Twitter sx={{ marginRight: 2.5 }} /> */}
            ใบกำกับภาษี
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isBranch && isBranch.branch_image && (
                <Avatar
                  alt=''
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${isBranch.branch_image}`}
                  sx={{ width: 34, height: 34, marginRight: 2.75 }}
                />
              )}

              <Typography variant='body2' sx={{ color: 'common.white' }}>
                ใบกำกับภาษี (เต็ม)
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardStock
