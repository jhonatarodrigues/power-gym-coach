import { create } from "zustand";

import {
  paymentRecordsMock,
  studentSubscriptionsMock,
  teacherPlansMock,
} from "@/repository/mock";
import type {
  BillingCycle,
  PaymentMethod,
  PaymentRecord,
  PaymentStatus,
  StudentSubscription,
  TeacherPlanFeature,
  TeacherPlanDefinition,
} from "@/types";

interface PaymentStoreState {
  teacherPlans: TeacherPlanDefinition[];
  subscriptions: StudentSubscription[];
  paymentRecords: PaymentRecord[];
  addTeacherPlan: (input: {
    teacherId: string;
    name: string;
    billingCycle: BillingCycle;
    monthlyAmount: number;
    description: string;
    includedFeatures: TeacherPlanFeature[];
  }) => void;
  payRecord: (recordId: string, method: PaymentMethod) => void;
  getOpenRecordsByUser: (userId: string) => PaymentRecord[];
  getPaymentStatusByStudent: (studentId: string) => PaymentStatus | null;
  getTeacherExpectedRevenue: (teacherId: string) => number;
  getTeacherCollectedRevenue: (teacherId: string) => number;
  getTeacherStudentPlanRecords: (teacherId: string) => PaymentRecord[];
  getTeacherPlansByTeacher: (teacherId: string) => TeacherPlanDefinition[];
  reset: () => void;
}

const initialTeacherPlans = JSON.parse(JSON.stringify(teacherPlansMock)) as TeacherPlanDefinition[];
const initialSubscriptions = JSON.parse(
  JSON.stringify(studentSubscriptionsMock)
) as StudentSubscription[];
const initialPaymentRecords = JSON.parse(
  JSON.stringify(paymentRecordsMock)
) as PaymentRecord[];

function computeSubscriptionStatus(records: PaymentRecord[]): PaymentStatus {
  if (records.some((record) => record.status === "inactive")) {
    return "inactive";
  }

  if (records.some((record) => record.status === "overdue")) {
    return "overdue";
  }

  if (records.some((record) => record.status === "gracePeriod")) {
    return "gracePeriod";
  }

  if (records.some((record) => record.status === "pending")) {
    return "pending";
  }

  return "paid";
}

export const usePaymentStore = create<PaymentStoreState>((set, get) => ({
  teacherPlans: initialTeacherPlans,
  subscriptions: initialSubscriptions,
  paymentRecords: initialPaymentRecords,
  addTeacherPlan: ({
    billingCycle,
    description,
    includedFeatures,
    monthlyAmount,
    name,
    teacherId,
  }) =>
    set((state) => ({
      teacherPlans: [
        {
          id: `teacher-plan-${state.teacherPlans.length + 1}`,
          teacherId,
          name,
          billingCycle,
          monthlyAmount,
          description,
          includedFeatures,
        },
        ...state.teacherPlans,
      ],
    })),
  payRecord: (recordId, method) =>
    set((state) => {
      const nextRecords = state.paymentRecords.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "paid" as const,
              method,
              paidAt: new Date().toISOString(),
            }
          : record
      );

      const nextSubscriptions = state.subscriptions.map((subscription) => {
        const subscriptionRecords = nextRecords.filter(
          (record) => record.subscriptionId === subscription.id
        );

        return {
          ...subscription,
          status: computeSubscriptionStatus(subscriptionRecords),
        };
      });

      return {
        paymentRecords: nextRecords,
        subscriptions: nextSubscriptions,
      };
    }),
  getOpenRecordsByUser: (userId) =>
    get().paymentRecords.filter(
      (record) => record.userId === userId && record.status !== "paid"
    ),
  getPaymentStatusByStudent: (studentId) =>
    get().subscriptions.find((subscription) => subscription.studentId === studentId)?.status ??
    null,
  getTeacherExpectedRevenue: (teacherId) =>
    get()
      .subscriptions.filter((subscription) => subscription.teacherId === teacherId)
      .reduce((total, subscription) => {
        const plan = get().teacherPlans.find(
          (currentPlan) => currentPlan.id === subscription.teacherPlanId
        );

        return total + (plan?.monthlyAmount ?? 0);
      }, 0),
  getTeacherCollectedRevenue: (teacherId) =>
    get()
      .paymentRecords.filter(
        (record) =>
          record.teacherId === teacherId &&
          record.kind === "studentPlan" &&
          record.status === "paid"
      )
      .reduce((total, record) => total + record.amount, 0),
  getTeacherStudentPlanRecords: (teacherId) =>
    get().paymentRecords.filter(
      (record) => record.teacherId === teacherId && record.kind === "studentPlan"
    ),
  getTeacherPlansByTeacher: (teacherId) =>
    get().teacherPlans.filter((plan) => plan.teacherId === teacherId),
  reset: () =>
    set({
      teacherPlans: JSON.parse(JSON.stringify(teacherPlansMock)) as TeacherPlanDefinition[],
      subscriptions: JSON.parse(JSON.stringify(studentSubscriptionsMock)) as StudentSubscription[],
      paymentRecords: JSON.parse(JSON.stringify(paymentRecordsMock)) as PaymentRecord[],
    }),
}));
