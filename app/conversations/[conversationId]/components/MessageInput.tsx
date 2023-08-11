"use client";

import React, { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const MessageInput: FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  errors,
  register,
}) => {
  return (
    <div className="w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 rounded-full bg-neutral-100 w-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
