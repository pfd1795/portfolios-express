export function sendSuccess(res, data = {}, statusCode = 200) {
  res.status(statusCode).json({
    success: true,
    ...data
  });
}

export function sendError(res, message, statusCode = 500) {
  res.status(statusCode).json({
    success: false,
    message
  });
}

export function sendValidationError(res, errors) {
  const errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;

  res.status(400).json({
    success: false,
    message: errorMessage
  });
}

export function sendNotFound(res, message = 'Recurso no encontrado') {
  res.status(404).json({
    success: false,
    message
  });
}
