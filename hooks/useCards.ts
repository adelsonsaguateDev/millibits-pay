import { Card, CardStorage } from "@/utils/cardStorage";
import { useCallback, useEffect, useState } from "react";

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedCards = await CardStorage.getCards();
      setCards(loadedCards);
    } catch (err) {
      setError("Failed to load cards");
      console.error("Error loading cards:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCard = useCallback(
    async (
      cardData: Omit<
        Card,
        "id" | "createdAt" | "lastFourDigits" | "maskedNumber"
      >
    ) => {
      try {
        setError(null);
        const newCard = await CardStorage.saveCard(cardData);
        setCards((prevCards) => [newCard, ...prevCards]);
        return newCard;
      } catch (err) {
        setError("Failed to save card");
        console.error("Error adding card:", err);
        throw err;
      }
    },
    []
  );

  const deleteCard = useCallback(async (cardId: string) => {
    try {
      setError(null);
      const success = await CardStorage.deleteCard(cardId);
      if (success) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      }
      return success;
    } catch (err) {
      setError("Failed to delete card");
      console.error("Error deleting card:", err);
      return false;
    }
  }, []);

  const clearAllCards = useCallback(async () => {
    try {
      setError(null);
      const success = await CardStorage.clearAllCards();
      if (success) {
        setCards([]);
      }
      return success;
    } catch (err) {
      setError("Failed to clear cards");
      console.error("Error clearing cards:", err);
      return false;
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  return {
    cards,
    loading,
    error,
    addCard,
    deleteCard,
    clearAllCards,
    refreshCards: loadCards,
  };
};
