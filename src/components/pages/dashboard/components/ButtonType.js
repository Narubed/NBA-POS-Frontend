import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Button, Drawer, Stack, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function VariantButtonGroup({ isProducts, handleFilterType }) {
  const [isDrawer, setDrawer] = useState(false)

  const ProductTypes = []
  isProducts.forEach(element => {
    const idx = ProductTypes.findIndex(item => item === element.product_type)
    if (idx === -1) {
      ProductTypes.push(element.product_type)
    }
  })

  const onResetFilter = () => {
    handleFilterType(null)
    setDrawer(false)
  }

  return (
    <>
      <Button startIcon={<Icon icon='ic:twotone-content-paste-search' />} onClick={() => setDrawer(true)}>
        ค้นหา
      </Button>

      <Drawer
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' }
        }}
        anchor='right'
        open={isDrawer}
        onClose={() => setDrawer(false)}
      >
        <Stack spacing={3} sx={{ p: 3 }}>
          <Typography variant='subtitle1' gutterBottom>
            ประเภทสินค้า
          </Typography>

          <RadioGroup>
            {ProductTypes.length !== 0 &&
              ProductTypes.map(item => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  onChange={e => handleFilterType(e.target.value)}
                  label={item}
                />
              ))}
            {/* {statusOrder.map(item => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio />}
                onChange={e => handleFilterType(e.target.value)}
                label={item}
              />
            ))} */}
          </RadioGroup>
        </Stack>
        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size='large'
            type='submit'
            color='inherit'
            variant='outlined'
            onClick={() => onResetFilter()}

            // startIcon={<Icon icon={roundClearAll} />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
