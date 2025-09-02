import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const TextAreaInput = ({
  label,
  error,
  placeholder,
  name,
  className = "",
  ...rest
}) => {
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
          <textarea
            rows={4}
            autoComplete="off"
            className="border-2 p-1.5 border-gray-300 rounded-lg focus:outline-none w-full"
            id={inputId}
            name={name}
            placeholder={placeholder || `Enter ${label || name}`}
            {...rest}
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

export default TextAreaInput;
