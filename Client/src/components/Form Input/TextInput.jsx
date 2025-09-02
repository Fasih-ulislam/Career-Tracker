import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const TextInput = ({
  label,
  colour = "bg-blue-500",
  error,
  type = "text",
  placeholder,
  name,
  className = "",
  Icon,
  ...rest
}) => {
  const isPassword = type === "password";

  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputId = `input-${name}`;

  return (
    <div className="">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="flex items-center">
        <div className="relative w-full">
          {Icon && (
            <Icon
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          )}
          <input
            autoComplete="off"
            className="border-b-2 pl-8 pr-2 py-1.5 border-gray-300 focus:outline-none w-full"
            id={inputId}
            name={name}
            type={isVisible ? "text" : type}
            placeholder={placeholder || `Enter ${label || name}`}
            {...rest}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          {isPassword &&
            (isVisible ? (
              <EyeOff
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={18}
              />
            ) : (
              <Eye
                onClick={() => setIsVisible(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={18}
              />
            ))}
          <motion.div
            layout
            className={`absolute bottom-0 left-0 h-0.5 ${colour}`}
            animate={{ width: isFocused ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-sm text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextInput;
