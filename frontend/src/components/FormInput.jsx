import { useState } from "react";
import { Eye } from "./Eye";
import { EyeOff } from "./EyeOff";

export default function FormInput({
  placeholder,
  type = "text",
  passwordToggle = false,
  value,
  onChange,
  name,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = passwordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative w-full flex flex-col">
      <input
        name={name}
        placeholder={placeholder}
        type={inputType}
        value={value}
        onChange={onChange}
        className="text-center placeholder-secondary border-b border-secondary 
                   focus:outline-none focus:ring-2 focus:ring-secondaryFlashy focus:border-transparent 
                   transition duration-200 py-1"
        {...props}
      />

      {passwordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 bottom-2 text-secondary hover:text-secondaryFlashy transition ease-in-out duration-300 cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}
