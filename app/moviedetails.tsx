'use client'
import React from 'react'
import { useRouter } from 'next/router'
export default function page() {
    const router = useRouter()
    console.log(router.query);
  return (
    <div>page</div>
  )
}
