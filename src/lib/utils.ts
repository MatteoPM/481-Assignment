import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasSameValues(array: number[], values: number[]) {
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

export function joinNames(names: string[]): string {
  if (names.length === 0) {
    return "";
  }
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return names.join(" and ");
  }
  // More than 2 names
  return names.slice(0, -1).join(", ") + ", and " + names[names.length - 1];
}
