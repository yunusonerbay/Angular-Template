export class Balance {
  currencyId: number;
  code: string; // Para Birimi Kodu
  credit: number; // Alacak
  debit: number; // Borç
  pendingCredit: number; // Bekleyen Yatırma İşlemleri
  pendingDebit: number; // Bekleyen Çekim İşlemleri
  orderBalance: number; // Bekleyen Gönderim Emirleri
  balance: number; // İlgili parabirimine ait bakiye
  lastRate: number; // Yerel Para Biriminin Son Satış Kuru
  defCurBalance: number; // Yerel Para Birimi Kuruna Göre Bakiye
}
