/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { Grid, Box } from '@mui/material'

import Main from '../../../src/components/auth/pages/main'

import ReportDashboard from '../../../src/components/pages/ReportDashboard'

const dashboardReport = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  React.useEffect(() => {
    if (session) {
      if (session.user.type_detail.toString() === 'พนักงานทั่วไป') {
        signOut()
      }
    }
  }, [])

  return (
    <div>
      <ReportDashboard />
    </div>
  )
}

export default dashboardReport
