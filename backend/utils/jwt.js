import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", SECRET);
export function generarToken(usuario) {
  // Puedes incluir el rol y cualquier dato relevante
  return jwt.sign(
    { id: usuario.ID, 
      rol: usuario.rol, 
      usuario: usuario.Usuario },
    SECRET,
    { expiresIn: '2h' }
  )
}

export function verificarToken(token) {
  return jwt.verify(token, SECRET)
}