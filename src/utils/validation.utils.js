export function validateNickname(nickname) {
  if (!nickname || typeof nickname !== 'string') {
    return { isValid: false, error: 'El nickname es requerido' };
  }

  const trimmed = nickname.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'El nickname no puede estar vacío' };
  }

  if (trimmed.length > 20) {
    return { isValid: false, error: 'El nickname es muy largo (máximo 20 caracteres)' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'El nickname es muy corto (mínimo 2 caracteres)' };
  }

  return { isValid: true, error: null };
}

export function validateClicks(clicks) {
  const clicksNum = parseInt(clicks);

  if (isNaN(clicksNum)) {
    return { isValid: false, error: 'Cantidad de clicks inválida', value: null };
  }

  if (clicksNum < 0) {
    return { isValid: false, error: 'La cantidad de clicks no puede ser negativa', value: null };
  }

  if (clicksNum > 1000) {
    return { isValid: false, error: 'Cantidad de clicks sospechosa (máximo 1000)', value: null };
  }

  return { isValid: true, error: null, value: clicksNum };
}

export function validateScoreData(data) {
  const errors = [];
  const validData = {};

  const nicknameValidation = validateNickname(data.nickname);
  if (!nicknameValidation.isValid) {
    errors.push(nicknameValidation.error);
  } else {
    validData.nickname = data.nickname.trim();
  }

  const clicksValidation = validateClicks(data.clicks);
  if (!clicksValidation.isValid) {
    errors.push(clicksValidation.error);
  } else {
    validData.clicks = clicksValidation.value;
  }

  return {
    isValid: errors.length === 0,
    errors,
    validData: errors.length === 0 ? validData : null
  };
}
