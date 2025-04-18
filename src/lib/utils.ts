/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityError } from '@/lib/http'
import { clsx, type ClassValue } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('accessToken') : null
}

export const setAccessTokenFromLocalStorage = (value: string) => {
  return isBrowser ?? localStorage.setItem('accessToken', value)
}

export const getRefeshTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('refreshToken') : null
}

export const setRefeshTokenFromLocalStorage = (value: string) => {
  return isBrowser ?? localStorage.setItem('RefeshToken', value)
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast('Lỗi', {
      description: error?.payload?.message ?? 'Lỗi không xác định',
      duration: duration ?? 3000
    })
  }
}
