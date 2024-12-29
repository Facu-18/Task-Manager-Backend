import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
  // Verifica que JWT_SECRET esté definido
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Asegura que el tipo de JWT_SECRET sea string
  const secret: string = process.env.JWT_SECRET;

  // Genera el token
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return token;
};
