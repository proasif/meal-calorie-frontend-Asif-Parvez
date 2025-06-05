import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// tiny helper to merge tailwind class names

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
