'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { getFlash } from '@lib/utils/flash'
import { useDeleteModal } from '@lib/stores'
import { FLASH_COOKIE_KEY } from '@lib/constants'

export default function FlashNotification() {
  const closeDeleteModal = useDeleteModal((state) => state.close)
  const getCookieValue = (cookieName: string) => {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.indexOf(cookieName + '=') === 0) {
        return cookie.substring(cookieName.length + 1)
      }
    }
  }
  useEffect(() => {
    if (getCookieValue(FLASH_COOKIE_KEY)) {
      getFlash().then((flash) => {
        if (flash) {
          if (flash.type === 'error') {
            toast.error(flash.message)
          } else {
            toast.success(flash.message)
          }
          closeDeleteModal()
        }
      })
    }
  }, [])
  return null
}
