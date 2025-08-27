import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

type UserPayload = {
    id: number
}

export function generateJWT(payload : UserPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "90d"
    })
    return token
}