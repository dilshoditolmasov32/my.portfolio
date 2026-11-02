import { useEffect, useState } from 'react'

const START_DELAY = 900
const TYPE_MS = 130
const DELETE_MS = 65
const HOLD_MS = 2800
const PAUSE_MS = 600

/**
 * Types `text` out letter by letter, holds, deletes it and starts over.
 * `typing` is true while letters are moving (the caret stays solid), false while it rests (caret blinks).
 * With `still` set it just shows the full text.
 */
export function useTypewriter(text: string, still: boolean) {
  const [count, setCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (still) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const wait = (ms: number) => new Promise<void>((r) => (timer = setTimeout(r, ms)))

    void (async () => {
      await wait(START_DELAY)
      while (!cancelled) {
        for (let i = 1; i <= text.length; i++) {
          if (cancelled) return
          setTyping(true)
          setCount(i)
          await wait(TYPE_MS * (0.7 + Math.random() * 0.6))
        }
        setTyping(false)
        await wait(HOLD_MS)
        for (let i = text.length - 1; i >= 0; i--) {
          if (cancelled) return
          setTyping(true)
          setCount(i)
          await wait(DELETE_MS)
        }
        setTyping(false)
        await wait(PAUSE_MS)
      }
    })()

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [text, still])

  return { text: still ? text : text.slice(0, count), typing: still ? false : typing }
}
