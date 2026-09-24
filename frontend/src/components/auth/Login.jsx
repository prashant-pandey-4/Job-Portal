import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff, Lock, Mail, UserCheck } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Unable to connect to server"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-100 sm:border-gray-200 rounded-2xl shadow-sm sm:shadow-lg p-6 sm:p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to continue to your JobPortal account
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-purple-600" /> Email Address
              </Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="name@example.com"
                required
                className="h-11 rounded-xl text-base sm:text-sm focus-visible:ring-purple-500"
              />
            </div>

            {/* Password Field with Show/Hide toggle */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-purple-600" /> Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  required
                  className="h-11 rounded-xl pr-11 text-base sm:text-sm focus-visible:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Role Radio Group */}
            <div className="space-y-2 pt-1">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-purple-600" /> Select Role
              </Label>
              <RadioGroup className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    input.role === "student"
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold shadow-xs"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="sr-only"
                  />
                  <span>Student</span>
                </label>
                <label
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    input.role === "recruiter"
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold shadow-xs"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="sr-only"
                  />
                  <span>Recruiter</span>
                </label>
              </RadioGroup>
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              disabled
              className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold shadow-md shadow-purple-200 transition-all hover:scale-[1.01]"
            >
              Sign In
            </Button>
          )}

          <div className="text-center pt-2">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#6A38C2] font-semibold hover:underline"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
