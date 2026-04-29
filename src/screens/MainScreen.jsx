import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert,
} from "react-native";
import useCardStore from "../store/cardStore";

export default function MainScreen({ navigation }) {
  const { cards, addCard, updateCard, deleteCard } = useCardStore();
  const [bankName, setBankName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expire, setExpire] = useState("");
  const [idCode, setIdCode] = useState("");
  const [resetDate, setResetDate] = useState("");
  const [countReq, setCountReq] = useState("");
  const [enabled, setEnabled] = useState("是");
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (!bankName || !cardNo || !countReq) {
      Alert.alert("提示", "请填写必填项：银行、卡号、次数要求");
      return;
    }
    const card = {
      bankName,
      cardNo,
      expire,
      idCode,
      resetDate,
      countReq: parseInt(countReq) || 0,
      enabled: enabled === "是",
    };
    if (editingId) {
      updateCard(editingId, card);
      setEditingId(null);
    } else {
      addCard(card);
    }
    clearForm();
  };

  const clearForm = () => {
    setBankName("");
    setCardNo("");
    setExpire("");
    setIdCode("");
    setResetDate("");
    setCountReq("");
    setEnabled("是");
  };

  const handleEdit = (card) => {
    setBankName(card.bankName);
    setCardNo(card.cardNo);
    setExpire(card.expire || "");
    setIdCode(card.idCode || "");
    setResetDate(card.resetDate || "");
    setCountReq(String(card.countReq));
    setEnabled(card.enabled ? "是" : "否");
    setEditingId(card.id);
  };

  const handleDelete = (id) => {
    Alert.alert("确认", "删除该银行卡？", [
      { text: "取消" },
      { text: "删除", style: "destructive", onPress: () => deleteCard(id) },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>新增 / 编辑银行卡</Text>

        <View style={styles.row}>
          <Text style={styles.label}>银行</Text>
          <TextInput style={styles.input} value={bankName} onChangeText={setBankName} placeholder="招商银行" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>卡号</Text>
          <TextInput style={styles.input} value={cardNo} onChangeText={setCardNo} placeholder="8888" keyboardType="numeric" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>有效期</Text>
          <TextInput style={styles.input} value={expire} onChangeText={setExpire} placeholder="2028/12" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>识别码</Text>
          <TextInput style={styles.input} value={idCode} onChangeText={setIdCode} placeholder="数字" keyboardType="numeric" maxLength={2} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>重置日期</Text>
          <TextInput style={styles.input} value={resetDate} onChangeText={setResetDate} placeholder="YYYY-MM-DD" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>次数要求</Text>
          <TextInput style={styles.input} value={countReq} onChangeText={setCountReq} placeholder="两位数" keyboardType="numeric" maxLength={2} style={{ width: 80 }} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>是否启用</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, enabled === "是" && styles.toggleActive]}
              onPress={() => setEnabled("是")}
            >
              <Text style={[styles.toggleText, enabled === "是" && styles.toggleTextActive]}>是</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, enabled === "否" && styles.toggleActive]}
              onPress={() => setEnabled("否")}
            >
              <Text style={[styles.toggleText, enabled === "否" && styles.toggleTextActive]}>否</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>{editingId ? "更新" : "保存"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearBtn} onPress={() => { clearForm(); setEditingId(null); }}>
            <Text style={styles.clearBtnText}>清空</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>银行卡列表</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thSeq]}>序号</Text>
          <Text style={[styles.th, styles.thBank]}>银行</Text>
          <Text style={[styles.th, styles.thCardNo]}>卡号</Text>
          <Text style={[styles.th, styles.thExpire]}>有效期</Text>
          <Text style={[styles.th, styles.thIdCode]}>识别码</Text>
          <Text style={[styles.th, styles.thReset]}>重置日期</Text>
          <Text style={[styles.th, styles.thReq]}>次数{"\n"}要求</Text>
          <Text style={[styles.th, styles.thEnabled]}>是否{"\n"}启用</Text>
          <Text style={[styles.th, styles.thAction]}>操作</Text>
        </View>

        {cards.map((card, idx) => (
          <View key={card.id} style={styles.tableRow}>
            <Text style={[styles.td, styles.tdSeq]}>{idx + 1}</Text>
            <Text style={[styles.td, styles.tdBank]} numberOfLines={1}>{card.bankName}</Text>
            <Text style={[styles.td, styles.tdCardNo]}>{card.cardNo}</Text>
            <Text style={[styles.td, styles.tdExpire]}>{card.expire || "-"}</Text>
            <Text style={[styles.td, styles.tdIdCode]}>{card.idCode || "-"}</Text>
            <Text style={[styles.td, styles.tdReset]}>{card.resetDate || "-"}</Text>
            <Text style={[styles.td, styles.tdReq]}>{card.countReq}</Text>
            <Text style={[styles.td, styles.tdEnabled, card.enabled ? styles.textGreen : styles.textRed]}>
              {card.enabled ? "是" : "否"}
            </Text>
            <View style={[styles.td, styles.tdAction]}>
              <TouchableOpacity onPress={() => handleEdit(card)} style={styles.editBtn}>
                <Text style={styles.editBtnText}>编辑</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(card.id)} style={styles.delBtn}>
                <Text style={styles.delBtnText}>删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {cards.length === 0 && (
          <Text style={styles.emptyText}>暂无银行卡，点击上方表单添加</Text>
        )}
      </View>

      <TouchableOpacity style={styles.detailBtn} onPress={() => navigation.navigate("Detail")}>
        <Text style={styles.detailBtnText}>查看卡明细 →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 12 },
  formCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 },
  formTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  label: { width: 70, fontSize: 13, color: "#666" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 6, padding: 7, fontSize: 13 },
  toggleRow: { flexDirection: "row" },
  toggleBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 6, borderWidth: 1, borderColor: "#ddd", marginRight: 8 },
  toggleActive: { backgroundColor: "#007aff", borderColor: "#007aff" },
  toggleText: { fontSize: 13, color: "#666" },
  toggleTextActive: { color: "#fff" },
  btnRow: { flexDirection: "row", marginTop: 8 },
  saveBtn: { flex: 1, backgroundColor: "#007aff", padding: 12, borderRadius: 8, alignItems: "center", marginRight: 8 },
  saveBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  clearBtn: { paddingHorizontal: 20, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", alignItems: "center" },
  clearBtnText: { color: "#666", fontSize: 15 },
  tableCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 },
  tableTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 12 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f8f8f8", borderRadius: 6, paddingVertical: 8, paddingHorizontal: 4 },
  th: { fontSize: 9, fontWeight: "bold", color: "#333", textAlign: "center" },
  thSeq: { width: 28 },
  thBank: { flex: 1 },
  thCardNo: { width: 45 },
  thExpire: { width: 60 },
  thIdCode: { width: 36 },
  thReset: { width: 70 },
  thReq: { width: 36 },
  thEnabled: { width: 36 },
  thAction: { width: 55 },
  tableRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  td: { fontSize: 11, textAlign: "center" },
  tdSeq: { width: 28, fontWeight: "bold", color: "#999" },
  tdBank: { flex: 1, fontSize: 11 },
  tdCardNo: { width: 45 },
  tdExpire: { width: 60, fontSize: 10 },
  tdIdCode: { width: 36 },
  tdReset: { width: 70, fontSize: 9 },
  tdReq: { width: 36 },
  tdEnabled: { width: 36, fontWeight: "bold" },
  tdAction: { width: 55, flexDirection: "row", justifyContent: "center" },
  textGreen: { color: "#2e7d32" },
  textRed: { color: "#c62828" },
  editBtn: { backgroundColor: "#e3f2fd", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, marginRight: 4 },
  editBtnText: { fontSize: 10, color: "#1976d2" },
  delBtn: { backgroundColor: "#ffebee", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4 },
  delBtnText: { fontSize: 10, color: "#c62828" },
  emptyText: { textAlign: "center", color: "#999", paddingVertical: 20, fontSize: 13 },
  detailBtn: { backgroundColor: "#007aff", padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  detailBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});