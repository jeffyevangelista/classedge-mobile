"use client";
import { createTextarea } from "@gluestack-ui/core/textarea/creator";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import {
  tva,
  useStyleContext,
  withStyleContext,
} from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { TextInput, View } from "react-native";

const SCOPE = "TEXTAREA";
const UITextarea = createTextarea({
  Root: withStyleContext(View, SCOPE),
  Input: TextInput,
});

const textareaStyle = tva({
  base: "w-full border border-outline-300 overflow-hidden content-center data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-600 data-[focus=true]:hover:border-primary-600 data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-outline-300",

  variants: {
    size: {
      sm: "min-h-[80px] p-2",
      md: "min-h-[100px] p-3",
      lg: "min-h-[120px] p-3",
      xl: "min-h-[140px] p-4",
    },

    variant: {
      underlined:
        "rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-600 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-600 data-[invalid=true]:data-[focus=true]:hover:border-error-600 data-[invalid=true]:data-[disabled=true]:hover:border-error-600",

      outline:
        "rounded border data-[invalid=true]:border-error-600 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-600 data-[invalid=true]:data-[focus=true]:hover:border-error-600 data-[invalid=true]:data-[disabled=true]:hover:border-error-600 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error",

      rounded:
        "rounded border data-[invalid=true]:border-error-600 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-600 data-[invalid=true]:data-[focus=true]:hover:border-error-600 data-[invalid=true]:data-[disabled=true]:hover:border-error-600 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error",
    },
  },
});

const textareaInputStyle = tva({
  base: "flex-1 font-body text-typography-900 py-0 placeholder:text-typography-500 web:cursor-text web:data-[disabled=true]:cursor-not-allowed web:outline-0 web:outline-none",

  parentVariants: {
    variant: {
      underlined: "px-0",
      outline: "",
      rounded: "px-1",
    },

    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});

type ITextareaProps = React.ComponentProps<typeof UITextarea> &
  VariantProps<typeof textareaStyle>;

const Textarea = React.forwardRef<
  React.ComponentRef<typeof UITextarea>,
  ITextareaProps
>(function Textarea(
  { className, variant = "rounded", size = "md", ...props },
  ref
) {
  return (
    <UITextarea
      ref={ref}
      {...props}
      className={textareaStyle({ variant, size, class: className })}
      context={{ variant, size }}
    />
  );
});

type ITextareaInputProps = React.ComponentProps<typeof UITextarea.Input> &
  VariantProps<typeof textareaInputStyle>;

const TextareaInput = React.forwardRef<
  React.ComponentRef<typeof UITextarea.Input>,
  ITextareaInputProps
>(function TextareaInput({ className, ...props }, ref) {
  const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE);

  return (
    <UITextarea.Input
      ref={ref}
      {...props}
      textAlignVertical="top"
      className={textareaInputStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

Textarea.displayName = "Textarea";
TextareaInput.displayName = "TextareaInput";

export { Textarea, TextareaInput };
