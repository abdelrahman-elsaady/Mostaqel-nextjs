

import { auth } from './../_lip/auth'

export default async function SessionPage() {

  
  const session = await auth()
  console.log(session)
  return (
    <div>
      <h1>Session</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          {session.token && <p>Token: {session.token}</p>}
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  )
}