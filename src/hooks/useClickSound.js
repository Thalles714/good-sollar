import { useCallback } from 'react'
import { playClickSound, withClickSound } from '../utils/audio'

export default function useClickSound() {
  const play = useCallback(() => {
    playClickSound()
  }, [])

  const wrap = useCallback((handler) => withClickSound(handler), [])

  return { playClickSound: play, withClickSound: wrap }
}
