/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import Main from '../../../src/components/auth/pages/main'
import ProductHistory from '../../../src/components/pages/stock/ProductHistory'

export default function index() {
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
      <ProductHistory />
    </div>
  )
}
