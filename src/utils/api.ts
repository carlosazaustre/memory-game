export interface Logo {
  name: string;
  image: string;
}

export const fetchLogos = async (): Promise<Logo[]> => {
  const response = await fetch("https://logotypes.dev/all");
  const data = await response.json();

  // Convertir el objeto records en un array de logos
  const allLogos = Object.values(data.records)
    .flat()
    .filter((logo: any) => logo.variant === "glyph") // solo logos tipo glyph
    .map((logo: any) => ({
      name: logo.name,
      image: logo.logo,
    }));

  // Obtener 15 logos aleatorios
  const shuffledLogos = allLogos.sort(() => Math.random() - 0.5);
  return shuffledLogos.slice(0, 15); // cambiado de 10 a 15
};
