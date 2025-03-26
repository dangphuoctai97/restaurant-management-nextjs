/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ChangePasswordV2BodyType } from '@/schemaValidations/account.schema'
import accountApiRequest from '@/apiRequest/account'

export async function PUT(request: Request) {
  const body = (await request.json()) as ChangePasswordV2BodyType
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return Response.json(
      {
        message: 'Không tìm thấy access token'
      },
      {
        status: 401
      }
    )
  }
  try {
    const { payload } = await accountApiRequest.sChangePasswordV2(accessToken, body)
    const decodedAccessToken = jwt.decode(payload.data.accessToken) as { exp: number }
    const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as { exp: number }

    cookieStore.set('accessToken', payload.data.accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000
    })

    cookieStore.set('refreshToken', payload.data.refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000
    })
    return Response.json(payload)
  } catch (error: any) {
    console.log('lỗi')
    return Response.json(
      {
        message: error.message ?? 'Có lỗi xảy ra'
      },
      {
        status: error.status ?? 500
      }
    )
  }
}
