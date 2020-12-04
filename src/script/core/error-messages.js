const errorMessages = {
  empty: () => 'Это обязательное поле',
  wrongLength: (min, max) => `Должно быть от ${min} до ${max} символов`,
  wrongUrl: () => 'Здесь должна быть ссылка',
  wrongEmail: () => 'Неправильный формат email'
}

export default errorMessages;