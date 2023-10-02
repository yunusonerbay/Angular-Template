export interface ProcessResponseReport {
  id: number;
  type: number; // 1:Cüzdandan Cüzdana Transfer, 2:Bankadan Cüzdana Yatırma, 3:Banka Hesabına Çekme, 4:Exchange, 5:Ödeme
  customerId: number; // Gönderici/İşlem Sahibi Müşteri
  walletId: number; // Gönderici/İşlem Sahibi Müşteri Cüzdanı
  currencyId: number; // Gönderim/İşlem Para Birimi
  value: number; // Gönderim/İşlem komisyonu eklenmemiş tutar
  fee: number; // Gönderim/İşlem Komisyon Ücreti
  total: number; // Gönderim/İşlem Komisyon ücreti eklenmiş tutar
  defRate: number; // Gönderim/İşlem Para Biriminin Default Yerel Kuru
  exRate?: number | null; // Exchange Edilen Para Birimlerinin Çapraz Kuru
  receiverId?: number | null; // Alıcı Müşteri
  receiverWalletId?: number | null; // Alıcı Cüzdan
  receiverCurrencyId?: number | null; // Alıcı Para Birimi
  receiverValue?: number | null; // Alıcı para biriminin tutarı
  receiverDefRate?: number | null; // Alıcı Para Biriminin Default Yerel Kuru
  orderId?: number | null;
  orderDetailId?: number | null;
  ibanId?: number | null;
  status: number; // 0:Bekliyor, 1:Onaylandı, 2:İptal, 3:Red
  statusDate: Date; // Son durum değişikliği tarihi
  messageId?: number | null;
  description?: string | null;
  referenceNumber: string; // İşleme Ait Unique Referans Numarası
  receiverNameSurname?: string | null;
  receiverIBAN?: string | null;
  receiverIdNo?: string | null;
  senderNameSurname?: string | null;
  senderIBAN?: string | null;
  senderIdNo?: string | null;
  transactionId?: string | null;
  refundTransactionId?: string | null;
  returnRequestReasonId?: number | null;
  returnCode?: number | null;
  paymentPurpose?: string | null;
  paymentSource?: string | null;
  riskScore: number;
  ip: string;
  cDate: Date; // İşlemin Oluşturulma Tarihi
  uDate: Date; // Güncellenme Tarihi
  refundRequestDate?: Date | null;
  refundDate?: Date | null;
  currency: string;
  receiverCurrency: string;
  customerName: string;
  receiverName: string;
  ibanNo: string;
  bankName: string;
  companiesName: string;
  subscriberNumber: string;
  invoicePaymentDate?: Date | null;
  invoiceEndPaymentDate?: Date | null;
  invoiceNumber: string;
  invoiceType: string;
  invoicePaymentPhoneNumber: string;
  invoicePaymentUser: string;
  invoicePaymentIdentityNumber: string;
  cancelDate?: Date | null;
  cancelReason: string;
}
