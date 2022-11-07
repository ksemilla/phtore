import { useRef } from "react"

const Home = () => {
  
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="min-h-screen">
      <div className="h-96 border flex items-center justify-center">
        <form>
          <div tabIndex={0} className="p-6 text-3xl border rounded-full max-w-xl" onClick={()=>inputRef.current?.focus()}>
            <div className="flex items-center space-x-4">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
              <input
                ref={inputRef}
                placeholder="Search store"
                className="outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home