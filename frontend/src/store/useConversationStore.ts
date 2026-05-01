import { create } from "zustand";

import { conversationMessagesMock } from "@/repository/mock";
import type { ConversationMessage, MessageSenderRole } from "@/types";

interface SendMessageInput {
  studentId: string;
  coachId: string;
  planId?: string;
  senderRole: MessageSenderRole;
  senderName: string;
  body: string;
}

interface ConversationState {
  messages: ConversationMessage[];
  sendMessage: (input: SendMessageInput) => void;
  getConversationByStudent: (studentId: string) => ConversationMessage[];
  reset: () => void;
}

const initialMessages = JSON.parse(JSON.stringify(conversationMessagesMock)) as ConversationMessage[];

export const useConversationStore = create<ConversationState>((set, get) => ({
  messages: initialMessages,
  sendMessage: (input) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `message-${Date.now()}`,
          sentAt: new Date().toISOString(),
          ...input,
        },
      ],
    })),
  getConversationByStudent: (studentId) =>
    get().messages
      .filter((message) => message.studentId === studentId)
      .sort((left, right) => left.sentAt.localeCompare(right.sentAt)),
  reset: () => set({ messages: initialMessages }),
}));
