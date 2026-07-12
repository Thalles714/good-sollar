import { assetUrl } from './assetUrl'

const CLICK_SOUND_FILE = 'button-click-sound.mp3'
const CLICK_SOUND_SRC = assetUrl(`sound/${CLICK_SOUND_FILE}`)
const CLICK_VOLUME = 0.22

let clickAudio = null
let pendingLoad = null

function isBrowser() {
  return typeof window !== 'undefined'
}

function getClickAudio() {
  if (!isBrowser()) return null

  if (!clickAudio) {
    clickAudio = new Audio(CLICK_SOUND_SRC)
    clickAudio.preload = 'auto'
    clickAudio.volume = CLICK_VOLUME
    clickAudio.load()
  }

  return clickAudio
}

function waitForAudioReady(audio) {
  if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve()
  }

  if (!pendingLoad) {
    pendingLoad = new Promise((resolve, reject) => {
      const cleanup = () => {
        audio.removeEventListener('canplaythrough', onReady)
        audio.removeEventListener('error', onError)
      }

      const onReady = () => {
        cleanup()
        resolve()
      }

      const onError = () => {
        cleanup()
        reject(audio.error ?? new Error('Falha ao carregar som de clique'))
      }

      audio.addEventListener('canplaythrough', onReady, { once: true })
      audio.addEventListener('error', onError, { once: true })
      audio.load()
    }).finally(() => {
      pendingLoad = null
    })
  }

  return pendingLoad
}

function playReadyAudio(audio) {
  try {
    if (!audio.paused) {
      audio.pause()
    }

    audio.currentTime = 0

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {})
    }
  } catch {
    // Falha silenciosa — autoplay bloqueado ou mídia indisponível
  }
}

export function playClickSound() {
  const audio = getClickAudio()
  if (!audio) return

  if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    playReadyAudio(audio)
    return
  }

  waitForAudioReady(audio)
    .then(() => playReadyAudio(audio))
    .catch(() => {})
}

export function withClickSound(handler) {
  return (...args) => {
    playClickSound()
    return handler?.(...args)
  }
}

export function getClickSoundPath() {
  return CLICK_SOUND_SRC
}

if (isBrowser()) {
  getClickAudio()
}
