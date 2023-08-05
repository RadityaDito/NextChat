import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex justify-center items-center  bg-white shadow-sm  rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 ring-1 
      ring-inset 
      ring-gray-300 
      focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
