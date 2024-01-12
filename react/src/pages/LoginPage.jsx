const LoginPage = () => {
  return (
    <div className="flex justify-center px-8 pt-16 border-t border-t-gray-200 ">
        <div className="w-[500px] min-h-[500px] shawdow-sm border border-gray-300 p-3">
            <h1 className="font-bold text-3xl text-center">Log In</h1>
            <form action="">
                <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input type="text" className="border p-2" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
