import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasSameValues(array: number[], values: number[]) {
  console.log(array);
  console.log(values);

  if (array.length !== values.length) {
    return false;
  }

  const sortedArray = [...array].sort();
  const sortedValues = [...values].sort();

  for (let i = 0; i < array.length; i++) {
    if (sortedArray[i] !== sortedValues[i]) {
      return false;
    }
  }

  return true;
}
