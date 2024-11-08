import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({ msg: 'Token missing' })
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(404).json({ msg: 'Invalid Token' })
        }
        req.user = user
        next()
    })
}