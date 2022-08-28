/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import Main from '../../../src/components/auth/pages/main'
import Activity from '../../../src/components/pages/menagement/activity'

export default function componentName() {
  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  return (
    <>
      <Activity />
    </>
  )
}
