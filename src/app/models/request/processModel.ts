export interface ProcessReport {
  processType?: number | null;
  processId?: number | null;
  customerName?: string | null;
  customerId?: number | null;
  receiverId?: number | null;
  riskScore?: number | null;
  status?: number | null;
  startDate?: Date;
  endDate?: Date;
  take?: number | null;
  skip?: number | null;
}
