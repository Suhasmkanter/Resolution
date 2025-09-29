import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

function Navbar() {
  const { user, loading, logout, session } = useAuthStore();
  let location = useLocation();
  console.log(session, loading)
  return (
    <nav className=" bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="w-full  lg:px-6  ">
        <div className="w-[100%] flex justify-between px-5   items-center h-16 sm:h-20">
          {/* Brand */}
          <div className="flex  items-center ">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Resolution</span>
            </Link>
          </div>
          {/* Navigation Links - Desktop */}
          {location && (location.pathname !== '/' && location.pathname !== '/explore') && <div div className="hidden md:flex w-full h-12 px-4   ">
            <input type="text" placeholder="Search..." className="border bg-white w-[80%] h-full rounded-3xl px-4 py-2" />
          </div>}

          <div className="hidden md:flex justify-end items-center   ">
            <div className="flex w-full  h-12 space-x-6 justify-end items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Explore
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Explore
              </Link>
              {user ? (
                <div className="hidden  md:flex items-center  space-x-3">
                  <Link
                    to="/upload"
                    className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >

                    Upload
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="w-[50px] h-[50px] rounded-[50%] bg-black">
                        <img src={user?.user_metadata?.avatar_url} className="w-full h-full rounded-[50%]" alt="" />
                      </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 " align="start" >
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link to={'/profile'}>
                            Profile
                          </Link>

                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuItem disabled>API</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}
                        disabled={loading}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Link to="/profile" className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {(user.fullName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block font-medium">
                    {user.fullName || user.email?.split('@')[0] || 'User'}
                  </span>
                </Link> */}
                </div>
              ) : (
                <div className="flex  items-center space-x-2">
                  <Button
                    asChild={true}
                    variant={'outline'}
                    className="inline-flex  items-center  sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                  >
                    <Link
                      to="/login"
                      className="inline-flex  items-center  sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                    >
                      {loading ? '...' : 'Sign in'}
                    </Link>
                  </Button>
                  <Button
                    variant={"outline"}
                    asChild={true}
                  >
                    <Link
                      to={'/signup'}
                      className=" bg-blue-600  px-4 sm:px-6 py-2 sm:py-3  text-white text-sm font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2  focus:ring-blue-500 transition-all duration-200 shadow-sm"
                    >
                      Sign up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white  p-2 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {/* <div className="md:hidden border-t border-gray-200 py-4">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-2 py-1"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-2 py-1"
            >
              Explore
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-2 py-1"
                >
                  Dashboard
                </Link>
                <Link
                  to="/upload"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-2 py-1"
                >
                  Upload
                </Link>
              </>
            )}
          </div>
        </div> */}
      </div>
    </nav >
  );
}

export default Navbar;