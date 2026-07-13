import { assetUrl } from './assetUrl'

const CLICK_SOUND_FILE = 'button-click-sound.mp3'
const CLICK_SOUND_SRC = assetUrl(`sound/${CLICK_SOUND_FILE}`)
const CLICK_VOLUME = 0.16
const POOL_SIZE = 8

const INTERACTIVE_SELECTOR = [
  'button:not(:disabled)',
  'a[href]',
  'input:not([type="hidden"]):not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="tab"]',
  '[role="option"]',
  '[role="menuitem"]',
  '[role="menuitemradio"]',
  'label[for]',
].join(',')

const CUSTOM_CLICK_SELECTOR = '.mobile-menu-overlay, .rp-lightbox'

let audioPool = []
let poolCursor = 0
let poolReady = false
let poolInitPromise = null
let globalListenerBound = false

function isBrowser() {
  return typeof window !== 'undefined'
}

function initAudioPool() {
  if (poolInitPromise) return poolInitPromise

  poolInitPromise = new Promise((resolve, reject) => {
    if (!isBrowser()) {
      reject(new Error('Audio indisponível'))
      return
    }

    audioPool = Array.from({ length: POOL_SIZE }, () => {
      const audio = new Audio(CLICK_SOUND_SRC)
      audio.preload = 'auto'
      audio.volume = CLICK_VOLUME
      return audio
    })

    const lead = audioPool[0]
    lead.addEventListener(
      'canplaythrough',
      () => {
        poolReady = true
        resolve()
      },
      { once: true },
    )
    lead.addEventListener('error', reject, { once: true })
    lead.load()
  }).catch(() => {
    poolInitPromise = null
  })

  return poolInitPromise
}

function playFromPool() {
  if (!audioPool.length) return

  const audio = audioPool[poolCursor % POOL_SIZE]
  poolCursor += 1

  try {
    audio.currentTime = 0
    void audio.play().catch(() => {})
  } catch {
    // Falha silenciosa — autoplay bloqueado ou mídia indisponível
  }
}

export function playClickSound() {
  if (!isBrowser()) return

  if (poolReady) {
    playFromPool()
    return
  }

  initAudioPool()
    .then(() => playFromPool())
    .catch(() => {})
}

function findClickSoundTarget(element) {
  if (!(element instanceof Element)) return null
  if (element.closest('[data-no-click-sound]')) return null

  const interactive = element.closest(INTERACTIVE_SELECTOR)
  if (interactive) return interactive

  return element.closest(CUSTOM_CLICK_SELECTOR)
}

export function initGlobalClickSound() {
  if (!isBrowser() || globalListenerBound) return () => {}

  globalListenerBound = true
  initAudioPool().catch(() => {})

  const handleClick = (event) => {
    if (event.button !== 0) return
    if (!findClickSoundTarget(event.target)) return
    playClickSound()
  }

  document.addEventListener('click', handleClick, { capture: true, passive: true })

  return () => {
    document.removeEventListener('click', handleClick, { capture: true })
    globalListenerBound = false
  }
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
  initAudioPool().catch(() => {})
}
