import { usePaymentStore } from "@/store/usePaymentStore";

export function usePayments() {
  const teacherPlans = usePaymentStore((state) => state.teacherPlans);
  const subscriptions = usePaymentStore((state) => state.subscriptions);
  const paymentRecords = usePaymentStore((state) => state.paymentRecords);
  const payRecord = usePaymentStore((state) => state.payRecord);
  const getOpenRecordsByUser = usePaymentStore((state) => state.getOpenRecordsByUser);
  const getPaymentStatusByStudent = usePaymentStore(
    (state) => state.getPaymentStatusByStudent
  );
  const getTeacherExpectedRevenue = usePaymentStore(
    (state) => state.getTeacherExpectedRevenue
  );

  return {
    teacherPlans,
    subscriptions,
    paymentRecords,
    payRecord,
    getOpenRecordsByUser,
    getPaymentStatusByStudent,
    getTeacherExpectedRevenue,
  };
}
