import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { companies } = useSelector((store) => store.company);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        setMobileMenuOpen(false);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => {
            navigate("/");
            closeMobileMenu();
          }}
          className="cursor-pointer flex items-center"
        >
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-[#1E3A5F]">Job</span>
            <span className="text-[#06B6D4]">Portal</span>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/jobs"
                    className={`hover:text-[#6A38C2] transition-colors ${
                      location.pathname.startsWith("/admin/jobs")
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      companies?.length > 0
                        ? `/admin/companies/${companies[0]._id}`
                        : "/admin/companies/create"
                    }
                    className={`hover:text-[#6A38C2] transition-colors ${
                      location.pathname.startsWith("/admin/companies")
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    Company Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`hover:text-[#6A38C2] transition-colors ${
                      location.pathname === "/"
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className={`hover:text-[#6A38C2] transition-colors ${
                      location.pathname === "/jobs"
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Desktop Auth Buttons / User Profile */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-200 hover:border-purple-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-sm">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                    }
                    alt={user?.fullname || "User avatar"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-lg rounded-xl">
                <div>
                  <div className="flex gap-3 items-center pb-3 border-b border-gray-100">
                    <Avatar className="h-12 w-12 border border-gray-200">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                        }
                        alt={user?.fullname}
                      />
                    </Avatar>
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.profile?.bio || user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col pt-3 gap-1 text-gray-600">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm font-medium"
                    >
                      <User2 className="w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <Avatar
              onClick={() => navigate("/profile")}
              className="h-9 w-9 cursor-pointer border border-purple-200"
            >
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                }
                alt={user?.fullname}
              />
            </Avatar>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-4">
          <ul className="flex flex-col space-y-2 pt-2">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/jobs"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      companies?.length > 0
                        ? `/admin/companies/${companies[0]._id}`
                        : "/admin/companies/create"
                    }
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    Company Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="pt-2 border-t border-gray-100">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white justify-center">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      }
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {user?.fullname}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-700"
                >
                  <User2 className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
