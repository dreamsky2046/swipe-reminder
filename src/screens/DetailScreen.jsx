import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import useCardStore from "../store/cardStore";

export default function DetailScreen() {
  const { cards, incSwiped, decSwiped } = useCardStore();
  const enabledCards = cards.filter((c) => c.enabled);

  const totalSwiped = enabledCards.reduce((sum, c) => sum + c.swipedCount, 0);
  const totalReq = enabledCards.reduce((sum, c) => sum + c.countReq, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thSeq]}>序号</Text>
          <Text style={[styles.th, styles.thBank]}>银行</Text>
          <Text style={[styles.th, styles.thCardNo]}>卡号</Text>
          <Text style={[styles.th, styles.thExpire]}>有效期</Text>
          <Text style={[styles.th, styles.thIdCode]}>识别码</Text>
          <Text style={[styles.th, styles.thReq]}>次数{"\n"}要求</Text>
          <Text style={[styles.th, styles.thSwiped]}>已刷卡</Text>
          <View style={[styles.th, styles.thOps]}><Text style={styles.thOpsText}>刷</Text></View>
          <View style={[styles.th, styles.thOps]}><Text style={styles.thOpsText}>卡</Text></View>
        </View>

        {enabledCards.map((card, idx) => (
          <View key={card.id} style={styles.tableRow}>
            <Text style={[styles.td, styles.tdSeq]}>{idx + 1}</Text>
            <Text style={[styles.td, styles.tdBank]} numberOfLines={1}>{card.bankName}</Text>
            <Text style={[styles.td, styles.tdCardNo]}>{card.cardNo}</Text>
            <Text style={[styles.td, styles.tdExpire]}>{card.expire || "-"}</Text>
            <Text style={[styles.td, styles.tdIdCode]}>{card.idCode || "-"}</Text>
            <Text style={[styles.td, styles.tdReq]}>{card.countReq}</Text>
            <Text style={[styles.td, styles.tdSwiped]}>{card.swipedCount}</Text>
            <TouchableOpacity style={styles.plusBtn} onPress={() => incSwiped(card.id)}>
              <Text style={styles.plusBtnText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.minusBtn} onPress={() => decSwiped(card.id)}>
              <Text style={styles.minusBtnText}>-1</Text>
            </TouchableOpacity>
          </View>
        ))}

        {enabledCards.length === 0 && (
          <Text style={styles.emptyText}>暂无启用的银行卡</Text>
        )}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          📊 统计：{enabledCards.length}张卡，已刷/目标 = {totalSwiped}/{totalReq}
        </Text>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>💡 删除或「启用=否」的卡不显示</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 12 },
  tableCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f8f8f8", borderRadius: 6, paddingVertical: 8, paddingHorizontal: 4 },
  th: { fontSize: 9, fontWeight: "bold", color: "#333", textAlign: "center" },
  thSeq: { width: 28 },
  thBank: { flex: 1 },
  thCardNo: { width: 45 },
  thExpire: { width: 60 },
  thIdCode: { width: 36 },
  thReq: { width: 36 },
  thSwiped: { width: 36 },
  thOps: { width: 30, justifyContent: "center", alignItems: "center" },
  thOpsText: { fontSize: 11, fontWeight: "bold", color: "#1976d2" },
  tableRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  td: { fontSize: 11, textAlign: "center" },
  tdSeq: { width: 28, fontWeight: "bold", color: "#999" },
  tdBank: { flex: 1, fontSize: 11 },
  tdCardNo: { width: 45 },
  tdExpire: { width: 60, fontSize: 10 },
  tdIdCode: { width: 36 },
  tdReq: { width: 36 },
  tdSwiped: { width: 36, fontWeight: "bold", color: "#007aff", fontSize: 13 },
  plusBtn: { flex: 1, backgroundColor: "#e8f5e9", paddingVertical: 5, borderRadius: 4, marginHorizontal: 1, justifyContent: "center", alignItems: "center" },
  plusBtnText: { color: "#2e7d32", fontWeight: "bold", fontSize: 12 },
  minusBtn: { flex: 1, backgroundColor: "#ffebee", paddingVertical: 5, borderRadius: 4, marginHorizontal: 1, justifyContent: "center", alignItems: "center" },
  minusBtnText: { color: "#c62828", fontWeight: "bold", fontSize: 12 },
  emptyText: { textAlign: "center", color: "#999", paddingVertical: 20 },
  summary: { backgroundColor: "#e3f2fd", padding: 14, borderRadius: 10, marginBottom: 12 },
  summaryText: { fontSize: 14, color: "#333", fontWeight: "bold" },
  note: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8 },
  noteText: { fontSize: 12, color: "#999" },
});