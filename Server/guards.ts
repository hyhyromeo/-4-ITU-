import express from "express"
import { Bearer } from "permit"
import jwtSimple from "jwt-simple"
import jwt from "./jwt"
import "./request"
import { JWTPayload } from "../Shared/dist/types"

const permit = new Bearer({ query: "access_token" })

export function requireJWT(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req)
    if (!token) {
      res
        .status(401)
        .json({ ok: false, error: "missing Bearer Token in request header" })
      return
    }
    const payload: JWTPayload = jwtSimple.decode(token, jwt.jwtSecret)
    req.jwtPayload = payload
    next()
  } catch (e) {
    console.log(e)
    res
      .status(401)
      .json({ ok: false, error: "invalid JWT Token in request header" })
    return
  }
}

export function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req)
    if (!token) {
      res
        .status(401)
        .json({ ok: false, error: "missing Bearer Token in request header" })
      return
    }
    const payload: JWTPayload = jwtSimple.decode(token, jwt.jwtSecret)
    if (payload.is_admin == false) {
      res.status(403).json({ msg: "Unauthorized" })
      return
    }
    req.jwtPayload = payload
    next()
  } catch (e) {
    console.log(e)
    res
      .status(401)
      .json({ ok: false, error: "invalid JWT Token in request header" })
    return
  }
}
