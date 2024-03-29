import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'

// material
import { styled } from '@mui/material/styles'
import { Toolbar, Typography, OutlinedInput, InputAdornment } from '@mui/material'

import Swal from 'sweetalert2'

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}))

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: '15px' },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}))

// ----------------------------------------------------------------------

ReportListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
}

export default function ReportListToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder='ค้นหารายงาน ...'
          startAdornment={
            <InputAdornment position='start'>
              <Icon icon='bx:search-alt' width='28' height='28' />
            </InputAdornment>
          }
        />
      )}
    </RootStyle>
  )
}
