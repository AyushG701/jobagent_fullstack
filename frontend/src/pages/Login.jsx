import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice.js";
import { toast, Toaster } from "sonner";
import { Lock, Mails, User } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector((state) => {
    console.log("State in selector of user:", state.user);
    return state.user;
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role || "");
    formData.append("email", email || "");
    formData.append("password", password || "");

    // Log the contents of formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    dispatch(login(formData));
    toast.error("login sucessfull");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated, error]);

  return (
    <>
      <Toaster />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Login to your account
          </h1>
          <p className="mt-4 text-gray-500">
            Welcome back! Please enter your login details.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4    shadow-sm"
        >
          <div>
            <label htmlFor="role" className="sr-only">
              Login As
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              >
                <option value="">Select Role</option>
                <option value="Employer">Register as an Employer</option>
                <option value="Job Seeker">Register as a Job Seeker</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center px-4">
                <User className="text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Mails className="text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Lock className="text-gray-400" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link to={"/register"} className="underline">
                Register Now
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
