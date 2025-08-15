import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useCards } from "@/hooks/useCards";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCardManualScreen() {
  const router = useRouter();
  const { addCard } = useCards();
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const validateForm = () => {
    if (!cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      Alert.alert("Erro", "Número do cartão deve ter 16 dígitos");
      return false;
    }
    if (!cardholderName.trim()) {
      Alert.alert("Erro", "Nome do titular é obrigatório");
      return false;
    }
    if (!expiryMonth || !expiryYear) {
      Alert.alert("Erro", "Data de validade é obrigatória");
      return false;
    }
    if (!cvv.match(/^\d{3,4}$/)) {
      Alert.alert("Erro", "CVV deve ter 3 ou 4 dígitos");
      return false;
    }
    return true;
  };

  const handleSaveCard = async () => {
    if (validateForm()) {
      setIsSaving(true);
      try {
        await addCard({
          cardNumber: cardNumber.replace(/\s/g, ""),
          cardholderName: cardholderName,
          expiryMonth: expiryMonth,
          expiryYear: expiryYear,
          cvv: cvv,
        });
        Alert.alert("Sucesso", "Cartão adicionado com sucesso!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } catch (error) {
        Alert.alert("Erro", "Falha ao adicionar cartão.");
        console.error(error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <LinearGradient
      colors={[Colors.light.tint, Colors.light.background]}
      locations={[0, 0.3]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backArrow}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Adicionar Cartão</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContent}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Card Preview */}
          <View style={styles.cardPreview}>
            <View style={styles.cardHeader}>
              <View style={styles.cardChip} />
              <View style={styles.cardLogo}>
                <ThemedText style={styles.cardLogoText}>M</ThemedText>
              </View>
            </View>

            <View style={styles.cardNumberContainer}>
              <ThemedText style={styles.cardNumberText}>
                {cardNumber || "•••• •••• •••• ••••"}
              </ThemedText>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <ThemedText style={styles.cardholderLabel}>TITULAR</ThemedText>
                <ThemedText style={styles.cardholderName}>
                  {cardholderName || "NOME DO TITULAR"}
                </ThemedText>
              </View>
              <View>
                <ThemedText style={styles.expiryLabel}>VÁLIDO ATÉ</ThemedText>
                <ThemedText style={styles.expiryDate}>
                  {expiryMonth && expiryYear
                    ? `${expiryMonth}/${expiryYear}`
                    : "MM/AA"}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Card Number */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>
                Número do Cartão
              </ThemedText>
              <TextInput
                style={styles.textInput}
                value={cardNumber}
                onChangeText={(text) =>
                  setCardNumber(formatCardNumber(text.replace(/\D/g, "")))
                }
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#999"
                maxLength={19}
                keyboardType="numeric"
              />
            </View>

            {/* Cardholder Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Nome do Titular</ThemedText>
              <TextInput
                style={styles.textInput}
                value={cardholderName}
                onChangeText={setCardholderName}
                placeholder="Como está no cartão"
                placeholderTextColor="#999"
                autoCapitalize="characters"
              />
            </View>

            {/* Expiry and CVV Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <ThemedText style={styles.inputLabel}>Mês</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={expiryMonth}
                  onChangeText={(text) => {
                    const month = text.replace(/\D/g, "");
                    if (parseInt(month) <= 12) {
                      setExpiryMonth(month);
                    }
                  }}
                  placeholder="MM"
                  placeholderTextColor="#999"
                  maxLength={2}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <ThemedText style={styles.inputLabel}>Ano</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={expiryYear}
                  onChangeText={(text) =>
                    setExpiryYear(text.replace(/\D/g, ""))
                  }
                  placeholder="AA"
                  placeholderTextColor="#999"
                  maxLength={2}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <ThemedText style={styles.inputLabel}>CVV</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={cvv}
                  onChangeText={(text) => setCvv(text.replace(/\D/g, ""))}
                  placeholder="123"
                  placeholderTextColor="#999"
                  maxLength={4}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Save Button */}
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveCard}
                disabled={isSaving}
              >
                <ThemedText style={styles.saveButtonText}>
                  {isSaving ? "Salvando..." : "Salvar Cartão"}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerSpacer: {
    width: 40,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardPreview: {
    backgroundColor: Colors.light.tint,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  cardChip: {
    width: 40,
    height: 30,
    backgroundColor: "#ffd700",
    borderRadius: 6,
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardLogoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardNumberContainer: {
    marginBottom: 30,
  },
  cardNumberText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardholderLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardholderName: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  expiryLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "right",
  },
  expiryDate: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  saveButtonContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  saveButton: {
    width: 280,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
