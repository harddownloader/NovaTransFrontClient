import jwt from "jsonwebtoken"

export const enc = (info: string): string => {
  const token = jwt.sign(
    info,
    "hawa"
    // {expiresIn:"1h"}
  )

  return token
}

export const dec = (info: string): any => {
  let data: any = false
  jwt.verify(info, "hawa", async (err, decoded) => {
    if (err) {
      data = false
    }
    
    data = decoded
  });

  return data
}
