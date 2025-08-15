import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Card {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  createdAt: number;
  lastFourDigits: string;
  maskedNumber: string;
}

const CARDS_STORAGE_KEY = "@millibits_pay_cards";

export class CardStorage {
  static async saveCard(
    card: Omit<Card, "id" | "createdAt" | "lastFourDigits" | "maskedNumber">
  ): Promise<Card> {
    try {
      const existingCards = await this.getCards();

      const newCard: Card = {
        ...card,
        id: Date.now().toString(),
        createdAt: Date.now(),
        lastFourDigits: card.cardNumber.slice(-4),
        maskedNumber: this.maskCardNumber(card.cardNumber),
      };

      const updatedCards = [...existingCards, newCard];
      await AsyncStorage.setItem(
        CARDS_STORAGE_KEY,
        JSON.stringify(updatedCards)
      );

      return newCard;
    } catch (error) {
      console.error("Error saving card:", error);
      throw new Error("Failed to save card");
    }
  }

  static async getCards(): Promise<Card[]> {
    try {
      const cardsJson = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
      if (!cardsJson) return [];

      const cards = JSON.parse(cardsJson) as Card[];
      return cards.sort((a, b) => b.createdAt - a.createdAt); // Most recent first
    } catch (error) {
      console.error("Error getting cards:", error);
      return [];
    }
  }

  static async deleteCard(cardId: string): Promise<boolean> {
    try {
      const existingCards = await this.getCards();
      const updatedCards = existingCards.filter((card) => card.id !== cardId);
      await AsyncStorage.setItem(
        CARDS_STORAGE_KEY,
        JSON.stringify(updatedCards)
      );
      return true;
    } catch (error) {
      console.error("Error deleting card:", error);
      return false;
    }
  }

  static async clearAllCards(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(CARDS_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing cards:", error);
      return false;
    }
  }

  private static maskCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.length < 8) return cleaned;

    const firstFour = cleaned.slice(0, 4);
    const lastFour = cleaned.slice(-4);
    const middle = "*".repeat(cleaned.length - 8);

    return `${firstFour} ${middle} ${lastFour}`.trim();
  }
}
