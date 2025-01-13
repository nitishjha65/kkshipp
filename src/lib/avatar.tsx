import { useMemo } from "react";
import { getColorByLetter } from "./utils";
import { useRouter } from "next/navigation"; // Important: use next/navigation for App Router
interface UserAvatarProps {
  firstName: string;
  onClick?: () => void;
}
// const UserAvatar = ({ firstName:string, onClick?: () => void}) => {
const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, onClick }) => {
  // Extract the first letter of the first name
  const firstLetter = firstName?.charAt(0)?.toUpperCase();

  // Get the fixed color based on the first letter
  const backgroundColor = useMemo(
    () => getColorByLetter(firstLetter),
    [firstLetter]
  );

  return (
    <div
      className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden cursor-pointer"
      style={{ backgroundColor }}
      onClick={onClick ? onClick : undefined}
    >
      <span className="flex items-center justify-center w-full h-full text-white font-bold text-lg">
        {firstLetter}
      </span>
    </div>
  );
};

export default UserAvatar;
