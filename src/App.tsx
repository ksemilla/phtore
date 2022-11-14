import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from "./routes"
import { useEffect, useState } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import { VERIFY_TOKEN } from './api/auth'
import { logError } from './utils'
import { useAuthStore } from './stores'
import { UserType } from './types'
import Spinner from './components/Spinner'

function App() {

  const [verifyToken] = useMutation<{ verifyToken: { acknowledge: boolean, user: UserType } }, { token: string }>(VERIFY_TOKEN)
  const token = localStorage.getItem('token')
  const loginUser = useAuthStore(state => state.login)
  const setVerifyingToken = useAuthStore(state => state.setVerifyingToken)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    const verify = async () => {
      try {
        if (token) {
          setVerifyingToken(true)
          const { data } = await verifyToken({ variables: { token: token } })
          data && loginUser(data.verifyToken.user)
        }
      } catch(e) {
        logError(e as ApolloError)
        localStorage.removeItem("token")
      } finally {
        setVerifyingToken(false)
        setLoading(false)
      }
    }

    verify()

  }, [])

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'>
      <Spinner color='text-gray-500' size={10}/>
    </div>
  }

  return (
    <RouterProvider router={routes} />
  )
}

export default App
