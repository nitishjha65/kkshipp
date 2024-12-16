import { useState } from "react";
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

interface SyllabusItemModalProps {
  item: SyllabusItem;
  onClose: () => void;
  onFeedbackSubmit: (
    studentId: number,
    rating: number,
    feedback: string
  ) => void;
}

const STUDENTS_PER_PAGE = 10;

export default function SyllabusItemModal({
  item,
  onClose,
  onFeedbackSubmit,
}: SyllabusItemModalProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = item.students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * STUDENTS_PER_PAGE,
    currentPage * STUDENTS_PER_PAGE
  );

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setRating(0);
    setFeedback("");
  };

  const handleSubmitFeedback = () => {
    if (selectedStudent) {
      onFeedbackSubmit(selectedStudent.id, rating, feedback);
      setSelectedStudent(null);
      setRating(0);
      setFeedback("");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.topic}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">
            Date: {new Date(item.date).toLocaleDateString()}
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
            {paginatedStudents.map((student) => (
              <div
                key={student.id}
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                  selectedStudent?.id === student.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => handleStudentClick(student)}
              >
                <Avatar>
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{student.name}</span>
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
              Provide Feedback for {selectedStudent.name}
            </h4>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
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
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
