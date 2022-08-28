import React from 'react'
import { useSession, signIn } from 'next-auth/react'

import { Grid, Box } from '@mui/material'

import Main from '../../../src/components/auth/pages/main'

import ReportDashboard from '../../../src/components/pages/ReportDashboard'

const dashboardReport = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  return (
    <div>
      <ReportDashboard />
    </div>
  )
}

export default dashboardReport
