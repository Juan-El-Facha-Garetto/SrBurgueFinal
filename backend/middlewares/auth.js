import { verificarToken } from '../utils/jwt.js'

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No autorizado' })
  const token = authHeader.split(' ')[1]
  try {
    const decoded = verificarToken(token)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Token inválido' })
  }
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'Solo admin' })
    }
    next()
  })
}