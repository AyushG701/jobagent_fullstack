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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DollarSign, LocateIcon, PenTool } from "lucide-react";
import { toast } from "sonner";

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

  const onSubmit = (values) => {
    console.log(values);
    // Handle form submission logic here
  };

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
    <main className="flex flex-col items-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
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
                        <FormItem>
                          <FormLabel>Cover Letter</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Cover Letter"
                              {...field}
                              rows={10}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {isAuthenticated && user.role === "Job Seeker" && (
                  <Button
                    type="submit"
                    className="mt-4 w-full"
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

      <div className="mt-8 w-full max-w-4xl">
        <header>
          <h3>{singleJob.title}</h3>
          {singleJob.personalWebsite && (
            <Link target="_blank" to={singleJob.personalWebsite.url}>
              {singleJob.personalWebsite.title}
            </Link>
          )}
          <p>{singleJob.location}</p>
          <p>Rs. {singleJob.salary} a month</p>
        </header>
        <hr />
        <section>
          <div className="wrapper">
            <h3>Job details</h3>
            <div>
              <DollarSign />
              <div>
                <span>Pay</span>
                <span>{singleJob.salary} a month</span>
              </div>
            </div>
            <div>
              <PenTool />
              <div>
                <span>Job type</span>
                <span>{singleJob.jobType}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Location</h3>
            <div className="location-wrapper">
              <LocateIcon />
              <span>{singleJob.location}</span>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Full Job Description</h3>
            <p>{singleJob.introduction}</p>
            {singleJob.qualifications && (
              <div>
                <h4>Qualifications</h4>
                <ul>
                  {qualifications.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {singleJob.responsibilities && (
              <div>
                <h4>Responsibilities</h4>
                <ul>
                  {responsibilities.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {singleJob.offers && (
              <div>
                <h4>Offering</h4>
                <ul>
                  {offering.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <hr />
        <footer>
          <h3>Job Niche</h3>
          <p>{singleJob.jobNiche}</p>
        </footer>
      </div>
    </main>
  );
};

export default PostApplication;
