import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Main from '../src/components/auth/pages/main'
import Dashboard from '../src/components/pages/dashboard'

export default function Component() {
  const router = useRouter()
  const { data: session } = useSession()
  if (!session) {
    return (
      <>
        <Main signIn={signIn} />
        {/* <button onClick={() => signIn()}>Sign in</button> */}
      </>
    )
  } else {
    console.log(session)
    const getLocalStorageBranch = localStorage.getItem('branch')
    if (!getLocalStorageBranch) {
      localStorage.setItem('branch', session.user.branch)
      localStorage.setItem('token', session.user.token)
    }

    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <Dashboard />
      </>
    )
  }
}
