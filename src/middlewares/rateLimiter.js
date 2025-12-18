const rateLimitStore = new Map();

const DEFAULT_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutos por defecto
  maxRequests: 20,
  message: 'Demasiadas solicitudes, intenta más tarde',
  statusCode: 429
};

/**
 * Middleware de Rate Limiting Personalizado (Sin dependencias externas)
 * Utiliza un algoritmo de "Ventana Fija" (Fixed Window).
 * 
 * @param {Object} config Configuración del limitador
 * @returns {Function} Middleware de Express
 */
export function createRateLimitMiddleware(config = {}) {
  const options = { ...DEFAULT_CONFIG, ...config };

  return function rateLimitMiddleware(req, res, next) {
    const clientIP = getClientIP(req);

    if (isRateLimited(clientIP, options)) {
      const resetTime = rateLimitStore.get(clientIP).resetTime;
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      // Cabeceras estándar para Rate Limiting
      res.setHeader('Retry-After', retryAfter);
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));

      return res.status(options.statusCode).json({
        success: false,
        message: options.message,
        retryAfter: retryAfter
      });
    }

    // Añadir cabeceras informativas si la petición pasa
    const record = rateLimitStore.get(clientIP);
    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

    next();
  };
}

/**
 * Verifica si una IP ha superado el límite de solicitudes.
 * Algoritmo: Fixed Window Counter (Contador de Ventana Fija)
 */
function isRateLimited(clientIP, options) {
  const now = Date.now();
  let clientRecord = rateLimitStore.get(clientIP);

  // 1. Si no existe registro, es la primera vez que entra
  if (!clientRecord) {
    clientRecord = {
      count: 1,
      resetTime: now + options.windowMs
    };
    rateLimitStore.set(clientIP, clientRecord);
    return false;
  }

  // 2. Si el tiempo de ventana ha expirado, reseteamos el contador
  if (now > clientRecord.resetTime) {
    clientRecord = {
      count: 1,
      resetTime: now + options.windowMs
    };
    rateLimitStore.set(clientIP, clientRecord);
    return false;
  }

  // 3. Si está dentro del tiempo y superó el límite
  if (clientRecord.count >= options.maxRequests) {
    return true; // Bloqueado
  }

  // 4. Si está dentro del tiempo y NO superó el límite, incrementamos
  clientRecord.count++;
  return false; // Pasa
}

/**
 * Obtiene la IP del cliente, soportando proxies (importante para producción)
 */
function getClientIP(req) {
  // x-forwarded-for es el estándar para proxies inversos (como Nginx o Heroku)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // Si hay múltiples IPs (chain), la primera es la del cliente original
    return forwarded.split(',')[0].trim();
  }
  
  return req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
    'unknown';
}

// Configuraciones predefinidas para diferentes casos de uso
export const rateLimitConfigs = {
  api: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100
  },

  // Submit score (más restrictivo para evitar trampas)
  submitScore: {
    windowMs: 5 * 60 * 1000, // 5 minutos
    maxRequests: 10,
    message: 'Demasiados envíos de puntuación. Espera un momento.'
  },

  // Leaderboard (menos restrictivo, solo para evitar spam)
  leaderboard: {
    windowMs: 1 * 60 * 1000, // 1 minuto
    maxRequests: 30,
    message: 'Demasiadas consultas al ranking. Espera un momento.'
  },

  // Desarrollo (muy permisivo para probar tranquilo)
  development: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 1000
  }
};

// Limpieza automática de memoria para evitar fugas (Memory Leak)
// Elimina IPs que ya no están bloqueadas ni contando
export function cleanupExpiredRecords() {
  const now = Date.now();

  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// Ejecutar limpieza cada 5 minutos
setInterval(cleanupExpiredRecords, 5 * 60 * 1000);

// Utilidad para ver el estado actual (para depuración)
export function getRateLimitStats() {
  return {
    totalClients: rateLimitStore.size,
    clients: Array.from(rateLimitStore.entries()).map(([ip, record]) => ({
      ip: ip,
      count: record.count,
      resetIn: Math.ceil((record.resetTime - Date.now()) / 1000)
    }))
  };
}

export function resetClient(ip) {
  rateLimitStore.delete(ip);
}
