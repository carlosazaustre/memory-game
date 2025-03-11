import { Logo } from "../models/Logo";

export interface LogoRepository {
  fetchLogos(): Promise<Logo[]>;
}
