export const Language = {
  // Common
  error: "Erro",
  success: "Sucesso",
  ok: "OK",
  back: "Voltar",
  save: "Guardar",
  cancel: "Cancelar",
  loading: "A carregar...",
  saving: "A guardar...",

  // Navigation
  authentication: "Autenticação",
  login: "Entrar",
  createAccount: "Criar Conta",

  // Cards
  card: "Cartão",
  cards: "Cartões",
  addCard: "Adicionar Cartão",
  addAnotherCard: "Adicionar outro cartão",
  associateCardToWallet: "Associar cartão à carteira",
  cardNumber: "Número do Cartão",
  cardholderName: "Nome do Titular",
  expiryDate: "Data de Validade",
  cvv: "CVV",
  validUntil: "VÁLIDO ATÉ",
  cardholder: "TITULAR",

  // Card Validation
  cardNumberRequired: "O número do cartão deve ter 16 dígitos",
  cardholderNameRequired: "O nome do titular é obrigatório",
  expiryDateRequired: "A data de validade é obrigatória",
  cvvRequired: "O CVV deve ter 3 ou 4 dígitos",
  cardAddedSuccessfully: "O cartão foi adicionado com sucesso!",
  failedToAddCard: "Falha ao adicionar o cartão.",

  // Payment Methods
  paymentMethod: "Método de Pagamento",
  selectPaymentMethod: "Selecione o método de pagamento",
  nfcPayment: "Pagamento NFC",
  qrCode: "Código QR",
  touchCardOnDevice:
    "Toque o seu cartão no dispositivo para pagar de forma rápida e segura",
  scanQrCode: "Digitalize o código QR para pagar em qualquer lugar",
  fast: "RÁPIDO",
  universal: "UNIVERSAL",
  available: "Disponível",
  moreMethodsComing: "Mais métodos em breve",
  newPaymentMethods: "Novas formas de pagamento serão adicionadas",

  // Card Operations
  addFirstCard: "Toque no botão flutuante para adicionar o seu primeiro cartão",
  placeCardSlowly:
    "Coloque e mova lentamente o cartão de crédito ou débito na parte de trás do seu telemóvel",
  waitingForCard: "À espera do cartão...",
  scanning: "Digitalizando...",
  addManually: "Adicionar Manualmente",
  asOnCard: "Como está no cartão",

  // Security
  security: "Segurança",
  authentication: "Autenticação",
  activateBiometrics: "Ativar Biometria",
  useFingerprint:
    "Use a sua impressão digital ou Face ID para entrar na aplicação",
  privacy: "Privacidade",
  hideBalance: "Ocultar Saldo",
  hideCardBalance: "Oculta o saldo dos cartões no ecrã inicial",
  lockApp: "Bloquear Aplicação",
  lockAppWhenNotInUse: "Bloqueia a aplicação quando não estiver em uso",
  notifications: "Notificações",
  securityAlerts: "Alertas de Segurança",
  receiveNotifications: "Receba notificações sobre atividades suspeitas",

  // Settings
  account: "Conta",
  theme: "Tema",
  chooseAppTheme: "Escolha o tema da aplicação",
  language: "Idioma",
  portuguesePortugal: "Português (Portugal)",
  support: "Suporte",
  help: "Ajuda",
  helpCenter: "Central de ajuda",
  termsOfUse: "Termos de Uso",
  readOurTerms: "Leia os nossos termos",
  about: "Sobre",
  version: "Versão",
  signOut: "Sair da Conta",

  // Placeholders
  cardNumberPlaceholder: "•••• •••• •••• ••••",
  cardholderNamePlaceholder: "NOME DO TITULAR",
  expiryDatePlaceholder: "MM/AA",
} as const;

export type LanguageKey = keyof typeof Language;
