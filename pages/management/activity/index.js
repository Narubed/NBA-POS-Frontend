/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Main from '../../../src/components/auth/pages/main'
import Activity from '../../../src/components/pages/menagement/activity'

export default function componentName() {
  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  React.useEffect(() => {
    if (session) {
      if (
        session.user.type_detail.toString() === 'พนักงานทั่วไป' ||
        session.user.type_detail.toString() === 'พนักงานเคาน์เตอร์'
      ) {
        signOut()
      }
    }
  }, [])

  return (
    <>
      <Activity />
    </>
  )
}
