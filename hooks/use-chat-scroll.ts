'use client'

import { useEffect, useRef } from 'react'

export function useChatScroll<T>(dep: T): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep])

  return ref
}