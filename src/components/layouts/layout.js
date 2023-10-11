import Sidebar from "components/sidebar/sidebar"

const Layout = ({children}) => {
  return (
    <main>
        
        <div className="flex">

            <Sidebar/>

            <div className="w-full pt-4 px-3 sm:px-6 md:px-8 lg:pl-8 bg-[#fcfcfc]">
                <header className=" flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white  text-sm py-3 mb-6 dark:bg-gray-800 dark:border-gray-700">
                    <nav className="flex basis-full items-center w-full mx-auto">
                        <div className="w-full flex items-center justify-end ml-auto sm:justify-end sm:gap-x-3 sm:order-3">
                            <div className="hidden sm:block">
                                    <input type="text" id="icon" name="icon" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Search" />
                            </div>
                            <div className="flex flex-row items-center justify-end gap-2">
                            
                            </div>
                        </div>
                    </nav>
                </header>

                <section>
                    {children}
                </section>
            </div>
        </div>

    </main>
  )
}

export default Layout