import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DollarSign, LocateIcon, PenTool } from "lucide-react";
import { toast } from "sonner";
import {
  postApplication,
  clearAllApplicationErrors,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice";

import { fetchSingleJob } from "@/store/slices/jobSlice";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Invalid phone number."),
  address: z.string().min(5, "Address must be at least 5 characters long."),
  coverLetter: z.string().optional(),
  resume: z.any().optional(),
});

const PostApplication = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      coverLetter: "",
      resume: null,
    },
  });

  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications,
  );

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <main className="flex flex-col items-center justify-center p-12 bg-gray-50">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className=" text-black">
          <CardTitle className=" mt-3 text-center text-4xl font-bold">
            Application Form
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <Form {...form}>
            <form className="flex justify-center">
              <div className=" w-full max-w-[550px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="  mb-3 block text-base font-medium text-[#07074D]">
                        Job Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            singleJob.title ? singleJob.title : "Try Correct ID"
                          }
                          {...field}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          disabled
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="  mb-3 block text-base font-medium text-[#07074D]">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="   mb-3 block text-base font-medium text-[#07074D]">
                        Your Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className=" mb-3 block text-base font-medium text-[#07074D]">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          {...field}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className=" mb-3 block text-base font-medium text-[#07074D]">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address"
                          {...field}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user && user.role === "Job Seeker" && (
                  <>
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem className="mb-5">
                          <FormLabel className=" mb-3 block text-base font-medium text-[#07074D]">
                            Cover Letter
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Cover Letter"
                              {...field}
                              rows={10}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 text-sm text-gray-600">
                            Resume
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <label className="flex cursor-pointer items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                Upload your resume
                                <input
                                  type="file"
                                  {...field}
                                  onChange={(e) => {
                                    console.log("File input changed:", e); // Log the entire event object
                                    console.log(
                                      "Selected file:",
                                      e.target.files[0],
                                    ); // Log the first selected file

                                    field.onChange(e); // Update the field's value
                                    resumeHandler(e); // Call your resumeHandler function

                                    // Update the displayed file name (if needed)
                                    if (e.target.files.length > 0) {
                                      console.log(
                                        "File name:",
                                        e.target.files[0].name,
                                      );
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                              <span className="ml-4 text-sm text-gray-700">
                                {field.value && field.value.length > 0
                                  ? field.value[0]?.name
                                  : "No file chosen"}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-xs text-red-600" />
                        </FormItem>
                       )}
                    /> */}

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem className="mb-5">
                          <FormLabel className="mb-3 block text-base font-medium text-[#07074D]">
                            Resume
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <label className="flex cursor-pointer items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ">
                                Upload your resume
                                <Input
                                  type="file"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e); // Update the field's value
                                    resumeHandler(e); // Call your resumeHandler function
                                  }}
                                  className="hidden"
                                  value={field.value || ""} // Ensure controlled input
                                />
                              </label>
                              <span className="ml-4 text-sm text-gray-700">
                                {resume?.name || "No file chosen"}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-xs text-red-600" />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {isAuthenticated && user.role === "Job Seeker" && (
                  <Button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 ease-in-out"
                    onClick={form.handleSubmit(handlePostApplication)}
                    disabled={loading}
                  >
                    Apply
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <div className="mt-8 w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <header className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {singleJob.title}
          </h3>
          {singleJob.personalWebsite && (
            <Link
              target="_blank"
              to={singleJob.personalWebsite.url}
              className="text-blue-500 hover:underline"
            >
              {singleJob.personalWebsite.title}
            </Link>
          )}
          <div className="text-gray-600 mt-2">
            <p>{singleJob.location}</p>
            <p>Rs. {singleJob.salary} a month</p>
          </div>
        </header>
        <hr className="my-4 border-gray-200" />
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Job Details</h3>
          <div className="flex items-center mt-3">
            <DollarSign className="mr-3 text-gray-500" />
            <div>
              <span className="block text-gray-600">Pay</span>
              <span className="block font-medium">
                {singleJob.salary} a month
              </span>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <PenTool className="mr-3 text-gray-500" />
            <div>
              <span className="block text-gray-600">Job Type</span>
              <span className="block font-medium">{singleJob.jobType}</span>
            </div>
          </div>
        </section>
        <hr className="my-4 border-gray-200" />
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <div className="flex items-center mt-3">
            <LocateIcon className="mr-3 text-gray-500" />
            <span className="text-gray-600">{singleJob.location}</span>
          </div>
        </section>
        <hr className="my-4 border-gray-200" />
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Full Job Description
          </h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            {singleJob.introduction}
          </p>
          {singleJob.qualifications && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Qualifications
              </h4>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {qualifications.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          )}
          {singleJob.responsibilities && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Responsibilities
              </h4>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {responsibilities.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          )}
          {singleJob.offers && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">Offering</h4>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {offering.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <hr className="my-4 border-gray-200" />
        <footer>
          <h3 className="text-lg font-semibold text-gray-700">Job Niche</h3>
          <p className="text-gray-600 mt-3">{singleJob.jobNiche}</p>
        </footer>
      </div> */}

      <div className="mt-8 w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <header className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {singleJob.title || "Job Title Not Provided"}
          </h3>
          {singleJob.personalWebsite ? (
            <Link
              target="_blank"
              to={singleJob.personalWebsite.url}
              className="text-blue-500 hover:underline"
            >
              {singleJob.personalWebsite.title || "Personal Website"}
            </Link>
          ) : (
            <p className="text-gray-600">Personal Website Not Provided</p>
          )}
          <div className="text-gray-600 mt-2">
            <p>{singleJob.location || "Location Not Provided"}</p>
            <p>Rs. {singleJob.salary || "Salary Not Provided"} a month</p>
          </div>
        </header>
        <hr className="my-4 border-gray-200" />
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Job Details</h3>
          <div className="flex items-center mt-3">
            <DollarSign className="mr-3 text-gray-500" />
            <div>
              <span className="block text-gray-600">Pay</span>
              <span className="block font-medium">
                {singleJob.salary || "Salary Not Provided"} a month
              </span>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <PenTool className="mr-3 text-gray-500" />
            <div>
              <span className="block text-gray-600">Job Type</span>
              <span className="block font-medium">
                {singleJob.jobType || "Job Type Not Provided"}
              </span>
            </div>
          </div>
        </section>
        <hr className="my-4 border-gray-200" />
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <div className="flex items-center mt-3">
            <LocateIcon className="mr-3 text-gray-500" />
            <span className="text-gray-600">
              {singleJob.location || "Location Not Provided"}
            </span>
          </div>
        </section>
        <hr className="my-4 border-gray-200" />
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Full Job Description
          </h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            {singleJob.introduction || "Introduction Not Provided"}
          </p>
          {singleJob.qualifications ? (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Qualifications
              </h4>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {qualifications.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 mt-4">Qualifications Not Provided</p>
          )}
          {singleJob.responsibilities ? (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Responsibilities
              </h4>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {responsibilities.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 mt-4">Responsibilities Not Provided</p>
          )}
          {singleJob.offers ? (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">Offering</h4>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {offering.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 mt-4">Offers Not Provided</p>
          )}
        </section>
        <hr className="my-4 border-gray-200" />
        <footer>
          <h3 className="text-lg font-semibold text-gray-700">Job Niche</h3>
          <p className="text-gray-600 mt-3">
            {singleJob.jobNiche || "Job Niche Not Provided"}
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PostApplication;
