import { Request, Response, NextFunction } from "express";
import { auth_strings  } from "../../config/constants";
import { decrypt } from "../../utils/cryptoUtils";


export const validateCustomToken = (req: Request, res: Response, next: NextFunction): void => {

  const token = req.headers.authorization || "";

  if (!token) {
     res.status(401).json({ error: "Unauthorized: No token provided" });
     return
  }
  const parts = token.split(' ');

    if (parts.length !== 3 || parts[0] !== 'X-Cipher-Key') {
       res.status(400).json({ error: 'Bad Request: Invalid token format' });
       return
    }
    // const keyIndex = parts[1];
    const encryptedToken = parts[2];

    

    const decryptedString = decrypt(encryptedToken);

    const isValidAuth = auth_strings.some((authStr) => decryptedString.includes(authStr));

    if (!isValidAuth) {
       res.status(403).json({ error: 'Forbidden: Invalid token content' });
       return
    }

  next();
};
