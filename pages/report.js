import { useSession, signIn, signOut } from 'next-auth/react'
import Main from '../src/components/auth/pages/main'

export default function Component() {
  const { data: session } = useSession()
  console.log(session)
  if (!session) {
    return <Main signIn={signIn} />
  }

  return (
    <>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
