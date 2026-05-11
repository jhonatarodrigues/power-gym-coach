import { usePaymentStore } from "@/store/usePaymentStore";

export function usePayments() {
  const teacherPlans = usePaymentStore((state) => state.teacherPlans);
  const subscriptions = usePaymentStore((state) => state.subscriptions);
  const paymentRecords = usePaymentStore((state) => state.paymentRecords);
  const addTeacherPlan = usePaymentStore((state) => state.addTeacherPlan);
  const payRecord = usePaymentStore((state) => state.payRecord);
  const getOpenRecordsByUser = usePaymentStore((state) => state.getOpenRecordsByUser);
  const getPaymentStatusByStudent = usePaymentStore(
    (state) => state.getPaymentStatusByStudent
  );
  const getTeacherExpectedRevenue = usePaymentStore(
    (state) => state.getTeacherExpectedRevenue
  );
  const getTeacherCollectedRevenue = usePaymentStore(
    (state) => state.getTeacherCollectedRevenue
  );
  const getTeacherStudentPlanRecords = usePaymentStore(
    (state) => state.getTeacherStudentPlanRecords
  );
  const getTeacherPlansByTeacher = usePaymentStore(
    (state) => state.getTeacherPlansByTeacher
  );

  return {
    teacherPlans,
    subscriptions,
    paymentRecords,
    addTeacherPlan,
    payRecord,
    getOpenRecordsByUser,
    getPaymentStatusByStudent,
    getTeacherExpectedRevenue,
    getTeacherCollectedRevenue,
    getTeacherStudentPlanRecords,
    getTeacherPlansByTeacher,
  };
}
