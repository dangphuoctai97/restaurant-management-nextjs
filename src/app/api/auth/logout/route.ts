/* eslint-disable @typescript-eslint/no-explicit-any */
import authApiRequest from '@/apiRequest/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Không nhận được access token hoặc refresh token'
      },
      {
        status: 200
      }
    )
  }
  try {
    const result = await authApiRequest.slogout({
      accessToken,
      refreshToken
    })
    return Response.json(result.payload)
  } catch (error: any) {
    return Response.json(
      {
        message: 'Có lỗi xảy ra'
      },
      {
        status: 200
      }
    )
  }
}
