import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../components/ThemedText";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";

interface Transaction {
  id: string;
  type: "payment" | "transfer" | "refund";
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  cardLast4: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "payment",
    amount: 25.5,
    currency: "BRL",
    description: "Supermercado Local",
    date: "2024-01-15T10:30:00Z",
    status: "completed",
    cardLast4: "1234",
  },
  {
    id: "2",
    type: "transfer",
    amount: 100.0,
    currency: "BRL",
    description: "Transferência para João",
    date: "2024-01-14T15:45:00Z",
    status: "completed",
    cardLast4: "5678",
  },
  {
    id: "3",
    type: "payment",
    amount: 45.8,
    currency: "BRL",
    description: "Posto de Gasolina",
    date: "2024-01-13T08:20:00Z",
    status: "completed",
    cardLast4: "1234",
  },
  {
    id: "4",
    type: "refund",
    amount: 29.99,
    currency: "BRL",
    description: "Reembolso - Loja Online",
    date: "2024-01-12T14:15:00Z",
    status: "completed",
    cardLast4: "5678",
  },
  {
    id: "5",
    type: "payment",
    amount: 15.9,
    currency: "BRL",
    description: "Farmácia",
    date: "2024-01-11T16:30:00Z",
    status: "pending",
    cardLast4: "1234",
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Filter to show only payment transactions
  const paymentTransactions = mockTransactions.filter(
    (t) => t.type === "payment"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "failed":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      case "failed":
        return "Falhou";
      default:
        return "Desconhecido";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return "payment";
      case "transfer":
        return "swap-horiz";
      case "refund":
        return "undo";
      default:
        return "receipt";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "#dc3545";
      case "transfer":
        return "#007bff";
      case "refund":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Hoje";
    } else if (diffDays === 2) {
      return "Ontem";
    } else if (diffDays <= 7) {
      return `${diffDays - 1} dias atrás`;
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderTransaction = (transaction: Transaction) => (
    <View key={transaction.id} style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View
          style={[
            styles.transactionIcon,
            { backgroundColor: getTypeColor(transaction.type) },
          ]}
        >
          <MaterialIcons
            name={getTypeIcon(transaction.type) as any}
            size={20}
            color="white"
          />
        </View>
        <View style={styles.transactionInfo}>
          <ThemedText style={styles.transactionDescription}>
            {transaction.description}
          </ThemedText>
          <ThemedText style={styles.transactionMeta}>
            {formatDate(transaction.date)} • {formatTime(transaction.date)} •
            Cartão ****{transaction.cardLast4}
          </ThemedText>
        </View>
        <View style={styles.transactionAmount}>
          <ThemedText style={styles.amountText}>
            {transaction.type === "refund" ? "+" : "-"}MZN{" "}
            {transaction.amount.toFixed(2)}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Histórico</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Pagamentos Recentes
          </ThemedText>

          {paymentTransactions.length > 0 ? (
            paymentTransactions.map(renderTransaction)
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="receipt-long" size={64} color="#6c757d" />
              <ThemedText style={styles.emptyStateTitle}>
                Nenhum pagamento encontrado
              </ThemedText>
              <ThemedText style={styles.emptyStateSubtitle}>
                Não há pagamentos no histórico
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.tint,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  transactionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 12,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  transactionMeta: {
    fontSize: 12,
    color: "#6c757d",
    lineHeight: 16,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "white",
    textTransform: "uppercase",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c757d",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
  },
  headerSpacer: {
    width: 40,
  },
});
