import { useSession, signIn, signOut } from "next-auth/react"
function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="w-1/4 h-1/4 rounded-md flex flex-col items-center justify-evenly text-xl">
          Signed in as {session.user.email}
          <button className="border border-slate-200 hover:border-slate-400 py-2 w-1/2" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="w-1/4 h-1/4 rounded-md flex flex-col items-center justify-evenly text-xl">
          Not signed in.
          <button className="border border-slate-200 hover:border-slate-400 py-2 w-1/2" onClick={() => signIn()}>Sign in</button>
    </div>
    // <>
    //   Not signed in <br />
    //   <button onClick={() => signIn()}>Sign in</button>
    // </>
  )
}

export default LoginButton;