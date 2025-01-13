import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import axios from "axios";

interface Student {
  userId: number;
  name: string;
  avatar: string;
  userName: string;
}

interface SyllabusItem {
  userId: number;
  topic: string;
  date: string;
  completed: boolean;
  students: Student[];
}

interface FeedbackEntry {
  studentId: number;
  rating: number;
  feedback: string;
  topic: string;
  isUserIdCreator?: boolean;
}

interface SyllabusItemModalProps {
  item?: any;
  details?: any;
  onClose: () => void;
  onFeedbackSubmit: (feedbackList: FeedbackEntry[]) => void;
}

const STUDENTS_PER_PAGE = 10;

// const sampleStudents: Student[] = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" },
//   {
//     id: 3,
//     name: "Charlie Brown",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   { id: 4, name: "Diana Ross", avatar: "/placeholder.svg?height=40&width=40" },
//   { id: 5, name: "Ethan Hunt", avatar: "/placeholder.svg?height=40&width=40" },
// ];

const SyllabusItemModal: React.FC<SyllabusItemModalProps> = ({
  item,
  details,
  onClose,
  onFeedbackSubmit,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);

  const [students, setStudents] = useState([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        // console.log("token", token);
        // if (!id) {
        //   notFound();
        //   return;
        // }

        console.log("details", details);
        console.log("token", token);
        if (token && details?._id) {
          // const response = await axios.get(`/api/profile/posts?id=${userName}`);
          const response = await axios.get(
            `/api/profile/feedback/getPeople?id=${details?._id}`,
            { withCredentials: true } // Include cookies for authentication

            // {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // }
          );

          setStudents(response?.data?.res?.[0]?.users || []); // Set students to the fetched data or empty array

          // setProfileData(response?.data);
          console.log("Response data:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [item, details]);

  // Memoize the students list to avoid unnecessary recalculations
  const filteredStudents = useMemo(
    () =>
      students?.filter((student: any) =>
        student?.userName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [students, searchTerm]
  );

  const totalPages = Math.ceil(filteredStudents?.length / STUDENTS_PER_PAGE);
  const paginatedStudents = filteredStudents?.slice(
    (currentPage - 1) * STUDENTS_PER_PAGE,
    currentPage * STUDENTS_PER_PAGE
  );

  const handleStudentClick = (student: Student) => {
    console.log("Selected Student:", student);
    setSelectedStudent(student);
    const existingFeedback = feedbackList?.find(
      (f) => f.studentId === student?.userId
    );
    if (existingFeedback) {
      setRating(existingFeedback?.rating);
      setFeedback(existingFeedback?.feedback);
    } else {
      setRating(0);
      setFeedback("");
    }
  };

  const handleSubmitFeedback = () => {
    if (selectedStudent) {
      const newFeedbackEntry: FeedbackEntry = {
        studentId: selectedStudent?.userId,
        topic: item?.topic,
        rating,
        feedback,
      };

      setFeedbackList((prevList) => {
        const index = prevList?.findIndex(
          (f) => f?.studentId === selectedStudent?.userId
        );
        if (index !== -1) {
          const newList = [...prevList];
          newList[index] = newFeedbackEntry;
          return newList;
        }
        return [...prevList, newFeedbackEntry];
      });

      setSelectedStudent(null);
      setRating(0);
      setFeedback("");
    }
  };

  const handleSubmitAllFeedback = () => {
    onFeedbackSubmit(feedbackList);
    onClose();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  console.log("item", item?.userId);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item?.topic || "Sample Topic"}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">
            Date:{" "}
            {item
              ? new Date(item.date).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </h4>
          <h4 className="font-semibold mb-2">Participating Students:</h4>
          <Input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="mb-2"
          />
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {paginatedStudents?.map((student: any) => (
              <div
                key={student?.userId}
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                  selectedStudent?.userId === student?.userId
                    ? "bg-slate-200"
                    : "bg-transparent"
                }`}
                onClick={() => handleStudentClick(student)}
              >
                <Avatar>
                  <AvatarImage src={student?.avatar} alt={student?.name} />
                  <AvatarFallback>{student?.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{student?.userName}</span>
                {feedbackList?.some(
                  (f) => f?.studentId === student?.userId
                ) && <span className="ml-auto text-green-500">✓</span>}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {selectedStudent && (
          <div className="sticky bottom-0 bg-background pt-4 border-t mt-4">
            <h4 className="font-semibold mb-2">
              Provide Feedback for {selectedStudent?.userName}
            </h4>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleSubmitFeedback}>Save Feedback</Button>
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          <span>
            {feedbackList?.length} of {students?.length} students reviewed
          </span>
          <Button
            onClick={handleSubmitAllFeedback}
            disabled={feedbackList?.length === 0}
          >
            Submit All Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SyllabusItemModal;
