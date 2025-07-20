import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;

class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      let profilePictureUrl: string | undefined = undefined;
      if(req.file) {
        const encodedFilename = encodeURIComponent(req.file.filename);
        profilePictureUrl = `${BASE_URL}/uploads/profile-pictures/${encodedFilename}`;
      }
      const { pseudo, email, password,bio } = req.body;
      if(!pseudo || !email || !password || !bio) {
        res.status(400).json({ error: "username, email et password sont requis" });
        return;
      }
      const token = await this.authService.register(bio,pseudo, email, password, profilePictureUrl);
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if(!email || !password) {
        res.status(400).json({ error: "Email et mot de passe requis" });
        return;
      }
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if(!token) {
        res.status(404).json({ error: "Token non fourni" });
        return;
      }
      const user = await this.authService.decodeToken(token);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
