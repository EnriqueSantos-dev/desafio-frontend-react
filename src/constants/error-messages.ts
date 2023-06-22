export const serverErrorStatus = [500, 502, 503, 504, 507, 508, 509];

const errorMessages = {
  internal_error: "O servidor falhou em responder, tente recarregar a página",
  generic_error:
    "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde",
  timeout_error: "O servidor demorou para responder, tente mais tarde",
} as const;

export function getServerErrorMessage() {
  return errorMessages.internal_error;
}

export function getErrorMessage(key: keyof typeof errorMessages) {
  return errorMessages[key];
}
