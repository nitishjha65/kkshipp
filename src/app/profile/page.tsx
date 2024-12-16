// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Star } from "lucide-react";

// export default function Profile() {
//   const [activeTab, setActiveTab] = useState("teaching");
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState<any>(null);

//   const courses = [
//     { id: 1, title: "Advanced React Patterns", students: 25, rating: 4.8 },
//     { id: 2, title: "Node.js Microservices", students: 18, rating: 4.6 },
//     { id: 3, title: "GraphQL Fundamentals", students: 30, rating: 4.9 },
//   ];

//   const enrolledCourses = [
//     {
//       id: 1,
//       title: "Machine Learning Basics",
//       instructor: "John Doe",
//       rating: 4.7,
//     },
//     {
//       id: 2,
//       title: "Data Structures and Algorithms",
//       instructor: "Jane Smith",
//       rating: 4.9,
//     },
//   ];

//   const students = [
//     { id: 1, name: "Alice Johnson", progress: 75 },
//     { id: 2, name: "Bob Williams", progress: 60 },
//     { id: 3, name: "Charlie Brown", progress: 90 },
//   ];

//   return (
//     <div className="container mx-auto py-16">
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="teaching">Teaching</TabsTrigger>
//           <TabsTrigger value="learning">Learning</TabsTrigger>
//         </TabsList>
//         <TabsContent value="teaching">
//           <div className="space-y-8">
//             {courses.map((course) => (
//               <Card key={course.id}>
//                 <CardHeader>
//                   <CardTitle>{course.title}</CardTitle>
//                   <CardDescription>
//                     Students: {course.students} | Rating: {course.rating}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Student</TableHead>
//                         <TableHead>Progress</TableHead>
//                         <TableHead>Action</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {students.map((student) => (
//                         <TableRow key={student.id}>
//                           <TableCell>{student.name}</TableCell>
//                           <TableCell>{student.progress}%</TableCell>
//                           <TableCell>
//                             <Button
//                               onClick={() => {
//                                 setSelectedStudent(student);
//                                 setFeedbackOpen(true);
//                               }}
//                             >
//                               Provide Feedback
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         <TabsContent value="learning">
//           <div className="space-y-8">
//             {enrolledCourses.map((course) => (
//               <Card key={course.id}>
//                 <CardHeader>
//                   <CardTitle>{course.title}</CardTitle>
//                   <CardDescription>
//                     Instructor: {course.instructor} | Rating: {course.rating}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`w-5 h-5 ${
//                           star <= Math.floor(course.rating)
//                             ? "text-yellow-400 fill-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Provide Feedback</DialogTitle>
//             <DialogDescription>
//               Give feedback and rating for {selectedStudent?.name}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="rating">Rating</Label>
//               <Input
//                 id="rating"
//                 type="number"
//                 min="1"
//                 max="5"
//                 placeholder="Rate from 1 to 5"
//               />
//             </div>
//             <div>
//               <Label htmlFor="feedback">Feedback</Label>
//               <Textarea
//                 id="feedback"
//                 placeholder="Provide your feedback here"
//               />
//             </div>
//             <Button onClick={() => setFeedbackOpen(false)}>
//               Submit Feedback
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
"use client";
import Posts from "@/components/profile/posts";

import React from "react";

const page = () => {
  return (
    <div>
      <Posts />
    </div>
  );
};

export default page;
