import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repositories/user.repository";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;
const SALT_ROUNDS = 10;

class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(bio : string,pseudo: string, email: string, password: string, profilePicture?: string): Promise<string> {
    const existingUser = await this.userRepository.getByEmail(email);
    if(existingUser) {
      throw new Error("Email déjà utilisé");
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userRepository.add({
      bio,
      pseudo,
      email,
      password: hashedPassword,
      profilePicture: profilePicture || null
    } as any);
    return jwt.sign({
      id: user.id,
      email: user.email
    }, SECRET_KEY, { expiresIn: "72h" });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getByEmail(email);
    if(!user) {
      throw new Error("Utilisateur non trouvé");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
      throw new Error("Mot de passe invalide");
    }
    return jwt.sign({
      id: user.id,
      email: user.email
    }, SECRET_KEY, { expiresIn: "72h" });
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      return await this.userRepository.get(decoded.id);
    } catch {
      throw new Error("Token invalide");
    }
  }
}

export default AuthService;