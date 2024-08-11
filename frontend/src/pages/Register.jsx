import {
  BookUser,
  LayoutGrid,
  Lock,
  Mails,
  Pencil,
  Phone,
  SquareUser,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearAllUserErrors, register } from "../store/slices/userSlice";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create a new account</h1>
        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <div className="relative mx-auto mt-8 max-w-md h-[500px]">
        <form
          onSubmit={handleRegister}
          className=" absolute inset-0  mx-auto mb-0 mt-8 max-w-md space-y-4 h-[500px] overflow-y-auto p-4 rounded-lg shadow-lg bg-white scrollbar-thin scrollbar-thumb-gray-300"
        >
          {/* Register As */}
          <div>
            <label htmlFor="role" className="sr-only">
              Register As
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
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <SquareUser className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Your Name"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Pencil className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="youremail@gmail.com"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Mails className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="111-222-333"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Phone className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <div className="relative">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Your Address"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <BookUser className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Your Password"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Lock className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Additional Fields for Job Seekers */}
          {role === "Job Seeker" && (
            <>
              <div>
                <label htmlFor="firstNiche" className="sr-only">
                  Your First Niche
                </label>
                <div className="relative">
                  <select
                    id="firstNiche"
                    value={firstNiche}
                    onChange={(e) => setFirstNiche(e.target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm overflow-y-auto  bg-white scrollbar-thin scrollbar-thumb-gray-300s"
                  >
                    <option value="">Your Niche</option>
                    {nichesArray.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <LayoutGrid className="text-gray-400" />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="secondNiche" className="sr-only">
                  Your Second Niche
                </label>
                <div className="relative">
                  <select
                    id="secondNiche"
                    value={secondNiche}
                    onChange={(e) => setSecondNiche(e.target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm overflow-y-auto  bg-white scrollbar-thin scrollbar-thumb-gray-300s"
                  >
                    <option value="">Your Niche</option>
                    {nichesArray.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <LayoutGrid className="text-gray-400" />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="thirdNiche" className="sr-only">
                  Your Third Niche
                </label>
                <div className="relative">
                  <select
                    id="thirdNiche"
                    value={thirdNiche}
                    onChange={(e) => setThirdNiche(e.target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm overflow-y-auto  bg-white scrollbar-thin scrollbar-thumb-gray-300s"
                  >
                    <option value="">Your Niche</option>
                    {nichesArray.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <LayoutGrid className="text-gray-400" />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="coverLetter" className="sr-only">
                  Cover Letter
                </label>
                <div className="relative">
                  <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={10}
                    className="w-full resize-none rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                    placeholder="Cover Letter"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume" className="sr-only">
                  Resume
                </label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    onChange={resumeHandler}
                    className="hidden" // Hide the default input
                  />
                  <label
                    htmlFor="resume"
                    className="cursor-pointer w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm flex items-center justify-between"
                  >
                    {resume ? resume.name : "Upload your resume"}
                    <span className="ml-2 text-blue-500">Browse</span>
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link to="/login" className="underline">
                Login Now
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
