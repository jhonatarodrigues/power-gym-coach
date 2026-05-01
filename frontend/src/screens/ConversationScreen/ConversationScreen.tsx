import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import { Button, Card, Header, Screen, TextField } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useConversationStore } from "@/store/useConversationStore";
import { useAppTheme } from "@/theme";
import { formatDateTimeBR } from "@/utils/dates";

export function ConversationScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const selectedPlan = useCoachContextStore((state) => state.getSelectedPlan());
  const messages = useConversationStore((state) => state.messages);
  const sendMessage = useConversationStore((state) => state.sendMessage);
  const [draft, setDraft] = useState("");
  const isCoach = session.accessLevel === "teacher";
  const targetStudent = isCoach ? selectedStudent?.user : session.currentUser;
  const targetStudentId =
    session.accessLevel === "student"
      ? session.currentUser?.id ?? ""
      : selectedStudent?.user.id ?? "";
  const conversation = useMemo(
    () =>
      messages
        .filter((message) => message.studentId === targetStudentId)
        .sort((left, right) => left.sentAt.localeCompare(right.sentAt)),
    [messages, targetStudentId]
  );

  if (!session.currentUser || !targetStudent) {
    return null;
  }

  return (
    <Screen>
      <Header
        title="Mensagens"
        subtitle={
          isCoach
            ? `Conversa com ${targetStudent.name}`
            : "Converse com seu coach sobre o plano atual."
        }
      />

      <View style={{ gap: theme.spacing.md }}>
        {conversation.map((message) => (
          <Card key={message.id}>
            <View style={{ gap: theme.spacing.xs }}>
              <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                {message.senderName}
              </Text>
              <Text style={{ color: theme.colors.text }}>{message.body}</Text>
              <Text style={{ color: theme.colors.textMuted }}>
                {formatDateTimeBR(message.sentAt)}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <TextField
          label="Nova mensagem"
          multiline
          onChangeText={setDraft}
          placeholder="Escreva sua mensagem"
          value={draft}
        />
        <Button
          label="Enviar mensagem"
          onPress={() => {
            if (!draft.trim()) {
              return;
            }

            sendMessage({
              studentId: targetStudent.id,
              coachId: "user-teacher-1",
              planId: selectedPlan?.id,
              senderRole: isCoach ? "coach" : "student",
              senderName: session.currentUser?.name ?? "",
              body: draft.trim(),
            });
            setDraft("");
          }}
        />
      </View>
    </Screen>
  );
}
