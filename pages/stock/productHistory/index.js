/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSession, signIn } from 'next-auth/react'

import Main from '../../../src/components/auth/pages/main'
import ProductHistory from '../../../src/components/pages/stock/ProductHistory'

export default function index() {
  const { data: session } = useSession()
  if (!session) return <Main signIn={signIn} />

  return (
    <div>
      <ProductHistory />
    </div>
  )
}
