import jwt from 'jsonwebtoken';

export const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRECT,{
        expiresIn:process.env.JWT_EXPIRES || '12d',
    });
}