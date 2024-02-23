import jwt from "jsonwebtoken"

const secretOrPrivateKey = 'somePrivateKey'

export const enc = (info: string): string => {
  const token = jwt.sign(
    info,
    secretOrPrivateKey,
    // {expiresIn:"1h"}
  )

  return token
}

export const dec = (info: string): any => {
  let data: any = false
  jwt.verify(info, secretOrPrivateKey, async (err, decoded) => {
    if (err) {
      data = false
    }
    
    data = decoded
  });

  return data
}
