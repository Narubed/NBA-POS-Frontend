import { useSession, signIn, signOut } from 'next-auth/react'
import Main from '../src/components/auth/pages/main'
import Dashboard from '../src/components/pages/dashboard'

export default function Component() {
  const { data: session } = useSession()
  console.log(session)
  if (!session) {
    return (
      <>
        <Main signIn={signIn} />
        {/* <button onClick={() => signIn()}>Sign in</button> */}
      </>
    )
  } else {
    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <Dashboard />
      </>
    )
  }
}