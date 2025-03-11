import { Card } from "../../domain/models/Card";
import { LogoRepository } from "../../domain/repositories/LogoRepository";

/**
 * Use case for fetching and preparing logo cards for the memory game.
 * @class
 */
export class FetchLogosUseCase {
  /**
   * Creates an instance of FetchLogosUseCase.
   * @param {LogoRepository} logoRepository - The repository for accessing logo data.
   */

  /**
   * Executes the use case to fetch logos and prepare cards.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * Each card contains an image URL, unique ID, and flip state.
   * The returned array includes duplicate cards (pairs) randomly sorted for the memory game.
   */
  constructor(private logoRepository: LogoRepository) {}

  async execute(): Promise<Card[]> {
    const logos = await this.logoRepository.fetchLogos();
    const logoUrls = logos.map((logo) => logo.image);

    return [...logoUrls, ...logoUrls]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        image,
        id: index,
        isFlipped: false,
      }));
  }
}
