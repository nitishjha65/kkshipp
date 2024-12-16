"use client";

import { useState } from "react";
import { X, Plus, Trash2, Star } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import Cookies from "js-cookie";

const syllabusItemSchema = z.object({
  id: z.number(),
  topic: z.string().min(1, "Topic is required"),
  date: z.date().nullable(),
  completed: z.boolean(),
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  // author: z.string().min(2, "Author name is required"),
  userLevel: z.enum([
    "Absolute Beginner",
    "Beginner",
    "Normal Intermediate",
    "Intermediate",
    "Advanced",
  ]),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  // votes: z.number().nonnegative(),
  // avatar: z.string().url("Invalid URL"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  // rating: z.number().min(0).max(5),
  syllabus: z
    .array(syllabusItemSchema)
    .min(1, "At least one syllabus item is required"), // Ensure at least one syllabus item
});

const categories = [
  { value: "Web Development", label: "Web Development" },
  { value: "QA and Testing", label: "QA and Testing" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "DevOps", label: "DevOps" },
  { value: "Artificial Intelligencee", label: "Artificial Intelligence" },
  { value: "Frontend Development", label: "Frontend Development" },
  { value: "Backend Development", label: "Backend Development" },
  { value: "Full Stack Development", label: "Full Stack Development" },
  { value: "Game Development", label: "Game Development" },
  { value: "Mobile App Development", label: "Mobile App Development" },
  { value: "Desktop App Development", label: "Desktop App Development" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Data Science", label: "Data Science" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
  { value: "AR/VR", label: "Augmented Reality / Virtual Reality" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Embedded Systems", label: "Embedded Systems" },
  { value: "other", label: "Other" },
];

export function PostForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      // author: "",
      userLevel: "Beginner",
      duration: "",
      category: "",
      // votes: 0,
      // avatar: "",
      difficulty: "Beginner",
      description: "",
      startDate: null,
      endDate: null,
      // rating: 0,
      syllabus: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submit Triggered", values);
    try {
      console.log("Form Values:", values);
      const token = Cookies.get("token");

      console.log("tokentoken", token);

      // setIsLoading(true);
      const response = await axios.post("/api/users/posts", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status == 200) {
        console.log("Posted Successfuly", response.data);
        const success = response?.data?.message;

        // form.reset();

        // setOpen(false);
        // setResponseMessage(success);
        // router.push("/profile");
      } else {
        const err = response?.data?.error;
        // setResponseMessage(err ?? "Unable to Login");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const addSyllabusItem = () => {
    const currentSyllabus = form.getValues("syllabus");
    form.setValue("syllabus", [
      ...currentSyllabus,
      {
        id: currentSyllabus.length + 1,
        topic: "",
        date: null,
        completed: false,
      },
    ]);
  };

  const removeSyllabusItem = (index: number) => {
    const currentSyllabus = form.getValues("syllabus");
    form.setValue(
      "syllabus",
      currentSyllabus.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:block py-1.5 px-2 font-extrabold rounded-lg text-white z-[1001] hover:border-2 border-2 hover:border-white hover:text-white bg-red-500 hover:bg-transparent  transition-all ease-linear"
      >
        Start Practice{" "}
      </button>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto ">
            <DialogHeader>
              <DialogTitle>Your Nest</DialogTitle>
              <DialogDescription>
                Fill in the details to create practice session
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pb-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              maxLength={50} // Restrict input length to 100 characters
                              placeholder="ReactJs/Python/Java/DSA Questions/..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Author Level*/}
                    <FormField
                      control={form.control}
                      name="userLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Understanding Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your understanding of this topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Absolute Beginner">
                                Absolute Beginner
                              </SelectItem>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Normal Intermediate">
                                Normal Intermediate
                              </SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (days)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              maxLength={30}
                              placeholder="e.g., 1 - 30 "
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (Number(value) > 30) {
                                  field.onChange(30); // Sets value to 30 if it exceeds
                                } else {
                                  field.onChange(value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              maxLength={300}
                              placeholder="I'm planning to revise ..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Start Date */}
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2">
                          <FormLabel
                            htmlFor="startDate"
                            className="text-gray-700 font-medium"
                          >
                            Start Date
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              id="startDate"
                              selected={field.value}
                              onChange={(date: Date | null) =>
                                field.onChange(date)
                              }
                              placeholderText="Select start date"
                              dateFormat="dd-MM-yyyy"
                              className="w-full border rounded px-2 py-1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* End Date */}
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2">
                          <FormLabel
                            htmlFor="endDate"
                            className="text-gray-700 font-medium"
                          >
                            End Date
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              id="endDate"
                              selected={field.value}
                              onChange={(date: Date | null) =>
                                field.onChange(date)
                              }
                              placeholderText="Select end date"
                              dateFormat="dd-MM-yyyy"
                              className="w-full border rounded px-2 py-1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Difficulty */}
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Syllabus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="syllabus"
                      render={() => (
                        <FormItem>
                          <div className="space-y-2">
                            {form.watch("syllabus").map((item, index) => (
                              <div
                                key={item.id}
                                className="flex flex-col md:flex-row items-center md:space-x-2"
                              >
                                <div className="md:flex md:flex-row md:flex-1 md:space-x-2  w-full">
                                  <Input
                                    placeholder="Topic"
                                    {...form.register(
                                      `syllabus.${index}.topic`
                                    )}
                                    className="w-full md:w-auto my-2"
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`syllabus.${index}.date`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl className="w-full">
                                          <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) =>
                                              field.onChange(date)
                                            }
                                            placeholderText="Select date"
                                            dateFormat="dd-MM-yyyy"
                                            className="w-full md:w-auto border rounded px-2 py-1 "
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeSyllabusItem(index)}
                                  className="ml-auto mt-2 md:mt-0"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full md:w-auto"
                            onClick={addSyllabusItem}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Practice Items
                          </Button>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                    <Button
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="w-full md:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="w-full md:w-auto">
                      Create Course
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
