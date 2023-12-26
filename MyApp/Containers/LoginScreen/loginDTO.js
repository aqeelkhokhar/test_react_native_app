function* LoginScreenSagaDTO(response) {
  const keys = {
    id: 'id',
    access_token: 'access_token',
    email: 'email',
  };

  console.log('keys before dto', Object.values(keys));

  const allKeysPresent = Object.values(keys).every(key => key in response);

  if (allKeysPresent) {
    const dto = {
      id: response[keys.id],
      access_token: response[keys.access_token],
      email: response[keys.email],
    };

    return yield Object.freeze(dto);
  } else {
    console.log('Invalid API response - Missing required keys');
  }
}

export default LoginScreenSagaDTO;
