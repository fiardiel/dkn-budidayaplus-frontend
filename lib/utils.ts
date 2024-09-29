import { clsx, type ClassValue } from "clsx"
import { createHash } from "crypto";
import { twMerge } from "tailwind-merge"

type FormDataConvertible = { [key: string]: string | number | boolean | File };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function objectToFormData(obj: FormDataConvertible) {
  const formData = new FormData();
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          formData.append(key, value instanceof File ? value : String(value));
      }
  }
  return formData;
}

export function formDataToObject(formData: FormData): FormDataConvertible {
  const obj: FormDataConvertible = {};
  Array.from(formData.entries()).forEach(([key, value]) => {
    obj[key] = value;
  });
  return obj;
}


export async function hashImageName(fileName: string): Promise<string> {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? ''
  const date = new Date().toISOString()
  const hashedFileName = createHash('sha256').update(`${fileName}${date}`).digest('hex')
  return `${hashedFileName}.${extension}`
}