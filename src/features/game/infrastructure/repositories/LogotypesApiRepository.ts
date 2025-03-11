import { Logo } from "../../domain/models/Logo";
import { LogoRepository } from "../../domain/repositories/LogoRepository";

export class LogotypesApiRepository implements LogoRepository {
  async fetchLogos(): Promise<Logo[]> {
    const response = await fetch("https://logotypes.dev/all");
    const data = await response.json();

    const allLogos = Object.values(data.records)
      .flat()
      .filter((logo: any) => logo.variant === "glyph")
      .map((logo: any) => ({
        name: logo.name,
        image: logo.logo,
      }));

    const shuffledLogos = allLogos.sort(() => Math.random() - 0.5);
    return shuffledLogos.slice(0, 15);
  }
}
