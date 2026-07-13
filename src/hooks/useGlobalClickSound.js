import { useEffect } from 'react'
import { initGlobalClickSound } from '../utils/audio'

export default function useGlobalClickSound() {
  useEffect(() => initGlobalClickSound(), [])
}
