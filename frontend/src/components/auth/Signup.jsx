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
import { setLoading } from "@/redux/authSlice";
import {
  Loader2,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setFileName(file.name);
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/\d/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: "Weak", color: "bg-red-500" };
      case 2:
        return { score: 50, label: "Fair", color: "bg-amber-500" };
      case 3:
        return { score: 75, label: "Good", color: "bg-blue-500" };
      case 4:
        return { score: 100, label: "Strong", color: "bg-green-500" };
      default:
        return { score: 15, label: "Very Weak", color: "bg-red-400" };
    }
  };

  const strength = getPasswordStrength(input.password);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
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
          className="w-full max-w-xl bg-white border border-gray-100 sm:border-gray-200 rounded-2xl shadow-sm sm:shadow-lg p-6 sm:p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900">
              Create an Account
            </h1>
            <p className="text-sm text-gray-500">
              Join thousands of job seekers and top recruiters
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name & Phone Number Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-purple-600" /> Full Name
                </Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  required
                  className="h-11 rounded-xl text-base sm:text-sm focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-purple-600" /> Phone Number
                </Label>
                <Input
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="9876543210"
                  required
                  className="h-11 rounded-xl text-base sm:text-sm focus-visible:ring-purple-500"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password with Strength Meter & Toggle */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-purple-600" /> Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="At least 6 characters"
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

              {/* Password strength indicator bar */}
              {input.password && (
                <div className="pt-1.5 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Password strength:</span>
                    <span className="font-semibold text-gray-700">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Role & Avatar Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">I am a</Label>
                <RadioGroup className="grid grid-cols-2 gap-2">
                  <label
                    className={`flex items-center justify-center p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${
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
                    className={`flex items-center justify-center p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${
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

              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Profile Photo</Label>
                <div className="relative">
                  <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-colors h-11">
                    <UploadCloud className="w-5 h-5 text-purple-600 shrink-0" />
                    <span className="text-xs text-gray-600 truncate">
                      {fileName ? fileName : "Upload image (Optional)"}
                    </span>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={changeFileHandler}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              disabled
              className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold shadow-md shadow-purple-200 transition-all hover:scale-[1.01]"
            >
              Create Account
            </Button>
          )}

          <div className="text-center pt-2">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6A38C2] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
