import React from "react";
import CourseCard from "@/components/profile/cards"; // Assuming the previous component is named CourseCard
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Award, BookOpen } from "lucide-react";

// Sample course data (you'd typically fetch this from an API)
const coursesData = [
  {
    id: 1,
    title: "Advanced React Patterns",
    author: "Sarah Chen",
    authorLevel: "Advanced",
    duration: "4 weeks",
    category: "Web Development",
    votes: 156,
    votedBy: [],
    avatar: "/placeholder-author1.jpg",
    difficulty: "Advanced",
    description:
      "Dive deep into advanced React patterns and best practices. Explore complex state management, performance optimization, and modern React features.",
    startDate: "2024-03-15",
    endDate: "2024-04-12",
    rating: 4.8,
    syllabus: [
      {
        id: 1,
        topic: "Higher-Order Components",
        date: "2024-03-15",
        completed: false,
      },
      {
        id: 2,
        topic: "Render Props Pattern",
        date: "2024-03-22",
        completed: false,
      },
      { id: 3, topic: "Custom Hooks", date: "2024-03-29", completed: false },
    ],
  },
  {
    id: 2,
    title: "Node.js Backend Mastery",
    author: "Michael Rodriguez",
    authorLevel: "Intermediate",
    duration: "6 weeks",
    category: "Backend Development",
    votes: 89,
    votedBy: [],
    avatar: "/placeholder-author2.jpg",
    difficulty: "Intermediate",
    description:
      "Learn advanced Node.js techniques, including scalable microservices, performance optimization, and enterprise-level backend architecture.",
    startDate: "2024-04-01",
    endDate: "2024-05-15",
    rating: 4.5,
    syllabus: [
      {
        id: 1,
        topic: "Advanced Express Routing",
        date: "2024-04-01",
        completed: false,
      },
      {
        id: 2,
        topic: "Database Optimization",
        date: "2024-04-15",
        completed: false,
      },
      {
        id: 3,
        topic: "Microservices Design",
        date: "2024-04-29",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    author: "Emily Wong",
    authorLevel: "Beginner",
    duration: "5 weeks",
    category: "Data Science",
    votes: 112,
    votedBy: [],
    avatar: "/placeholder-author3.jpg",
    difficulty: "Beginner",
    description:
      "A comprehensive introduction to machine learning concepts, algorithms, and practical implementations using Python and popular libraries.",
    startDate: "2024-02-15",
    endDate: "2024-03-22",
    rating: 4.7,
    syllabus: [
      { id: 1, topic: "Python for ML", date: "2024-02-15", completed: false },
      {
        id: 2,
        topic: "Linear Regression",
        date: "2024-02-29",
        completed: false,
      },
      {
        id: 3,
        topic: "Classification Algorithms",
        date: "2024-03-14",
        completed: false,
      },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-12 space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-primary">
            <AvatarImage src="/user-avatar.jpg" alt="User Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
            <Star className="w-5 h-5" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">John Doe</h1>
          <p className="text-gray-600 mb-4">
            Full Stack Developer | Tech Enthusiast
          </p>

          <div className="flex justify-center md:justify-start space-x-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm">12 Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">8 Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">My Courses</h2>
        <div className="space-y-4">
          {coursesData.map((course) => (
            <CourseCard key={course.id} details={course} />
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Award className="w-8 h-8 text-yellow-500" />,
              title: "React Pro",
              description: "Mastered React Advanced Patterns",
            },
            {
              icon: <BookOpen className="w-8 h-8 text-blue-500" />,
              title: "Backend Ninja",
              description: "Completed Node.js Mastery",
            },
            {
              icon: <Star className="w-8 h-8 text-green-500" />,
              title: "ML Beginner",
              description: "Started Machine Learning Journey",
            },
            {
              icon: <Star className="w-8 h-8 text-purple-500" />,
              title: "Continuous Learner",
              description: "3 Courses in 2 Months",
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all"
            >
              <div className="flex justify-center mb-3">{achievement.icon}</div>
              <h3 className="font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
