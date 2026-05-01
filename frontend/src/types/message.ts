import type { ID, ISODateTimeString } from "./common";

export type MessageSenderRole = "coach" | "student";

export interface ConversationMessage {
  id: ID;
  studentId: ID;
  coachId: ID;
  planId?: ID;
  senderRole: MessageSenderRole;
  senderName: string;
  body: string;
  sentAt: ISODateTimeString;
}
