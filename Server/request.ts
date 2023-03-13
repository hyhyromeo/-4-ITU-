import { JWTPayload } from '../Shared'

declare global {
  namespace Express {
    interface Request {
      jwtPayload: JWTPayload
    }
  }
}
