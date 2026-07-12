export const WHATSAPP_PHONE = '5561981166952'
export const WHATSAPP_DISPLAY = '(61) 98116-6952'
export const WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Good Sollar e gostaria de solicitar um orçamento gratuito de energia solar.'

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_MESSAGE)

export const BRAZILIAN_STATES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

export const ADDRESS = 'QNN 04 Conjunto I, Brasília/DF'
export const CNPJ = '36.009.955/0001-57'
export const HOURS = 'WhatsApp disponível a qualquer momento'
export const INSTAGRAM_URL = 'https://www.instagram.com/goodsollar/'
