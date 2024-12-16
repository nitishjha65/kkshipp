"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SyllabusItemModal from "./feedback";

interface Student {
  id: number;
  name: string;
  avatar: string;
}

interface SyllabusItem {
  id: number;
  topic: string;
  date: string;
  completed: boolean;
  students: Student[];
}

interface Course {
  title: string;
  author: string;
  authorLevel: string;
  duration: string;
  category: string;
  votes: number;
  avatar: string;
  difficulty: string;
  description: string;
  startDate: string;
  endDate: string;
  rating: number;
  syllabus: SyllabusItem[];
}

export default function PostForm() {
  const [isClient, setIsClient] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SyllabusItem | null>(null);
  const [course, setCourse] = useState<Course>({
    title: "Advanced React Patterns",
    author: "Sarah Chen",
    authorLevel: "Advanced",
    duration: "4 weeks",
    category: "Web Development",
    votes: 156,
    avatar: "/placeholder.svg?height=80&width=80",
    difficulty: "Intermediate",
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
        students: [
          {
            id: 1,
            name: "Alice Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 2,
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            name: "Charlie Brown",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 4,
            name: "Diana Prince",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 5,
            name: "Ethan Hunt",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 6,
            name: "Fiona Gallagher",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 7,
            name: "George Costanza",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 8,
            name: "Hermione Granger",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 9,
            name: "Ian Malcolm",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 10,
            name: "Julia Child",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 11,
            name: "Kevin McCallister",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 12,
            name: "Lara Croft",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 13,
            name: "Michael Scott",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 14,
            name: "Natasha Romanoff",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 15,
            name: "Oscar Martinez",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 2,
        topic: "Render Props Pattern",
        date: "2024-03-22",
        completed: false,
        students: [
          {
            id: 2,
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 4,
            name: "Diana Prince",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 3,
        topic: "Custom Hooks",
        date: "2024-03-29",
        completed: false,
        students: [
          {
            id: 1,
            name: "Alice Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            name: "Charlie Brown",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 4,
            name: "Diana Prince",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!isClient) return dateString;
    return new Date(dateString).toLocaleDateString();
  };

  const handleSyllabusItemClick = (item: SyllabusItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleFeedbackSubmit = (
    studentId: number,
    rating: number,
    feedback: string
  ) => {
    console.log(
      `Feedback submitted for student ${studentId}: Rating - ${rating}, Feedback - ${feedback}`
    );
    // Here you would typically update the state or send the data to a server
  };

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
            <Button>Join</Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src={course.avatar} alt={course.author} />
                <AvatarFallback>{course.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{course.author}</h2>
                <p className="text-gray-600">{course.category}</p>
              </div>
              <div className="ml-auto flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
          <Button>Join</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Avatar>
              <AvatarImage src={course.avatar} alt={course.author} />
              <AvatarFallback>{course.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{course.author}</h2>
              <p className="text-gray-600">{course.category}</p>
            </div>
            <div className="ml-auto flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p>{course.description}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Start: {formatDate(course.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>End: {formatDate(course.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Duration: {course.duration}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Syllabus</h3>
            <div className="space-y-4">
              {course.syllabus.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 group bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSyllabusItemClick(item)}
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{item.topic}</h4>
                    <p className="text-gray-500">{formatDate(item.date)}</p>
                  </div>
                  <button className=" bg-teal-500  text-white  rounded-xl py-2 px-5 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-100 cursor-pointer">
                    feedback
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedItem && (
        <SyllabusItemModal
          item={selectedItem}
          onClose={handleCloseModal}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
