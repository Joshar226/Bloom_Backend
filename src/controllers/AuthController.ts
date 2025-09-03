import type { Request, Response } from "express"
import { User } from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount = async (req : Request, res: Response) => {
        try {
            const {email, password} = req.body

            // Revisamos si el usuario existe
            const userExist = await User.findOne({where: {email}})            
            if(userExist) {
                const error = new Error('El usuario ya esta registrado')
                res.status(409).json({error: error.message})
                return
            }

            // Creamos el usuario
            const user = await User.create(req.body)
            user.password = await hashPassword(password)


            // Guardamos el password hasheado
            user.save()
            res.send('Cuenta creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static login = async (req : Request, res: Response) => {

        try {
            const {email, password} = req.body

            // Revisar si existe el usuario
                const user = await User.findOne({where: {email}})
                if(!user) {
                    const error = new Error('El usuario no esta registrado')
                    res.status(404).json({error: error.message})
                    return
                }
                
            // Revisar Password
            const isPasswordCorrect = await checkPassword(password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error('Password Incorrecto')
                res.status(401).json({error: error.message})
                return
            }

            // Generar token
            const token = generateJWT({id: user.id})
            res.send(token)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static user = async (req : Request, res: Response) => {
        res.json(req.user)
        return
    }
}