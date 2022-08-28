/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Container, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import CardTwitter from './component/CardComponent/CardTwitter'
import CardSales from './component/CardComponent/CardSales'
import CardStock from './component/CardComponent/CardStock'
import CardReport from './component/CardComponent/CardReport'
import CardCreateBracode from './component/CardComponent/CardCreateBracode'
import CardEmployee from './component/CardComponent/CardEmployee'

import CardSalesHistory from './component/CardSalesHistory'

export default function index() {
  const [isBranch, setBranch] = useState()
  const { data: session } = useSession()

  useEffect(() => {
    funcGetBranch()
    console.log(isBranch)
  }, [])

  const funcGetBranch = async () => {
    const isBranchid = localStorage.getItem('branch')
    await axios(`${process.env.NEXT_PUBLIC_POS_BACKEND}/branch/${isBranchid}`).then(res => setBranch(res.data.data))
  }

  return (
    <div>
      {' '}
      <Typography variant='h4' sx={{ mb: 5 }}>
        {isBranch && isBranch.branch_image && isBranch.branch_name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={2}>
          <CardSales isBranch={isBranch} />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CardStock isBranch={isBranch} />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CardReport isBranch={isBranch} />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CardEmployee isBranch={isBranch} />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CardTwitter />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CardCreateBracode isBranch={isBranch} />
        </Grid>
        <Grid item xs={12}>
          <CardSalesHistory />
        </Grid>
      </Grid>
    </div>
  )
}
