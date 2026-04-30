import type { ID, ISODateString, ISODateTimeString } from "./common";

export type PaymentMethod = "pix" | "card";

export type BillingCycle = "monthly" | "quarterly" | "yearly";

export type PaymentKind = "platformFee" | "studentPlan";

export type PaymentStatus =
  | "paid"
  | "pending"
  | "gracePeriod"
  | "overdue"
  | "inactive";

export interface TeacherPlanDefinition {
  id: ID;
  teacherId: ID;
  name: string;
  billingCycle: BillingCycle;
  monthlyAmount: number;
  description: string;
}

export interface StudentSubscription {
  id: ID;
  studentId: ID;
  teacherId: ID;
  teacherPlanId: ID;
  status: PaymentStatus;
  startedAt: ISODateString;
  nextDueDate: ISODateString;
  graceUntilDate: ISODateString;
}

export interface PaymentRecord {
  id: ID;
  userId: ID;
  teacherId?: ID;
  subscriptionId?: ID;
  kind: PaymentKind;
  title: string;
  description: string;
  referenceMonth: string;
  amount: number;
  status: PaymentStatus;
  dueDate: ISODateString;
  paidAt?: ISODateTimeString;
  method?: PaymentMethod;
}
