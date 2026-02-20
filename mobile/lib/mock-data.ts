export type Transaction = {
  id: string;
  icon: string;
  iconType: 'emoji' | 'initials' | 'image';
  color: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  time?: string;
  cardLast4?: string;
  cardName?: string;
  transactionId?: string;
  notes?: string;
  receipt?: string;
};

export type Card = {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  holder: string;
  expiry: string;
  color: 'blue' | 'red' | 'black';
};

export type DebitCard = {
  id: string;
  name: string;
  last4: string;
  spentToday: number;
};

export type Category = {
  id: string;
  label: string;
  color: string;
  emoji: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export type Employer = {
  name: string;
  role: string;
  paySchedule: string;
  lastPay: string;
  nextPay: string;
  lastAmount: number;
};

export type Account = {
  name: string;
  email: string;
  accountNumber: string;
  routingNumber: string;
  balance: number;
  avatar: string;
};

export const account: Account = {
  name: 'John Smith',
  email: 'john@bracket.app',
  accountNumber: '4829 1038 5567',
  routingNumber: '021000021',
  balance: 1234.56,
  avatar: 'JS',
};

export const categories: Category[] = [
  { id: 'all', label: 'All', color: '#4A90D9', emoji: '' },
  { id: 'income', label: 'Income', color: '#40C403', emoji: '' },
  { id: 'food', label: 'Food', color: '#FF9757', emoji: '' },
  { id: 'transport', label: 'Transport', color: '#FFD857', emoji: '' },
  { id: 'transfer', label: 'Transfer', color: '#ABFF57', emoji: '' },
];

export const transactions: Transaction[] = [
  // Monday, Dec 31
  {
    id: '1',
    icon: 'coffee',
    iconType: 'emoji',
    color: '#FF9757',
    name: 'Corner Cafe',
    category: 'food',
    amount: 7.24,
    date: '2025-12-31',
    type: 'debit',
    time: '9:15 am',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251231-001',
  },
  // Sunday, Dec 30
  {
    id: '2',
    icon: 'subway',
    iconType: 'emoji',
    color: '#FFD857',
    name: 'MTA Subway',
    category: 'transport',
    amount: 3.00,
    date: '2025-12-30',
    type: 'debit',
    time: '7:30 am',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251230-001',
  },
  {
    id: '3',
    icon: 'RS',
    iconType: 'initials',
    color: '#ABFF57',
    name: 'Rachel Smith',
    category: 'transfer',
    amount: 77.50,
    date: '2025-12-30',
    type: 'credit',
    time: '2:10 pm',
    transactionId: 'TXN-20251230-002',
  },
  {
    id: '4',
    icon: 'uber',
    iconType: 'image',
    color: '#000000',
    name: 'Uber technologies',
    category: 'transport',
    amount: 22.44,
    date: '2025-12-30',
    type: 'debit',
    time: '8:40 pm',
    cardLast4: '4321',
    cardName: "John Smith's Debit 2",
    transactionId: 'TXN-20251230-003',
    notes: 'Uber back from the Jetsons!',
    receipt: 'Receipt.png',
  },
  // Saturday, Dec 29
  {
    id: '5',
    icon: 'coffee',
    iconType: 'emoji',
    color: '#FF9757',
    name: 'Corner Cafe',
    category: 'food',
    amount: 12.80,
    date: '2025-12-29',
    type: 'debit',
    time: '10:05 am',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251229-001',
  },
  {
    id: '6',
    icon: 'subway',
    iconType: 'emoji',
    color: '#FFD857',
    name: 'MTA Subway',
    category: 'transport',
    amount: 3.00,
    date: '2025-12-29',
    type: 'debit',
    time: '8:00 am',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251229-002',
  },
  {
    id: '7',
    icon: 'uber',
    iconType: 'image',
    color: '#000000',
    name: 'Uber technologies',
    category: 'transport',
    amount: 39.44,
    date: '2025-12-29',
    type: 'debit',
    time: '11:30 pm',
    cardLast4: '4321',
    cardName: "John Smith's Debit 2",
    transactionId: 'TXN-20251229-003',
  },
  // Friday, Dec 28
  {
    id: '8',
    icon: 'coffee',
    iconType: 'emoji',
    color: '#FF9757',
    name: 'Corner Cafe',
    category: 'food',
    amount: 8.40,
    date: '2025-12-28',
    type: 'debit',
    time: '8:45 am',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251228-001',
  },
  {
    id: '9',
    icon: 'subway',
    iconType: 'emoji',
    color: '#FFD857',
    name: 'MTA Subway',
    category: 'transport',
    amount: 14.00,
    date: '2025-12-28',
    type: 'debit',
    time: '6:15 pm',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251228-002',
  },
  // Thursday, Dec 27
  {
    id: '10',
    icon: 'coffee',
    iconType: 'emoji',
    color: '#FF9757',
    name: 'Corner Cafe',
    category: 'food',
    amount: 9.99,
    date: '2025-12-27',
    type: 'debit',
    time: '7:50 am',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251227-001',
  },
  {
    id: '11',
    icon: 'employer',
    iconType: 'emoji',
    color: '#FF9757',
    name: 'Employer, Inc.',
    category: 'income',
    amount: 600.00,
    date: '2025-12-27',
    type: 'credit',
    time: '12:00 pm',
    transactionId: 'TXN-20251227-002',
  },
  {
    id: '12',
    icon: 'subway',
    iconType: 'emoji',
    color: '#FFD857',
    name: 'MTA Subway',
    category: 'transport',
    amount: 3.00,
    date: '2025-12-27',
    type: 'debit',
    time: '5:30 pm',
    cardLast4: '7890',
    cardName: "John Smith's Debit",
    transactionId: 'TXN-20251227-003',
  },
];

export type TransactionSection = {
  date: string;
  label: string;
  dailyTotal: number;
  data: Transaction[];
};

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function groupTransactionsByDate(txns: Transaction[]): TransactionSection[] {
  const groups: Record<string, Transaction[]> = {};
  for (const txn of txns) {
    if (!groups[txn.date]) groups[txn.date] = [];
    groups[txn.date].push(txn);
  }
  const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a));
  return sortedDates.map((date) => {
    const data = groups[date];
    const dailyTotal = data.reduce(
      (sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount),
      0,
    );
    return { date, label: formatDateLabel(date), dailyTotal, data };
  });
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((t) => t.id === id);
}

export function getTransactionSummary(txns: Transaction[]) {
  let income = 0;
  let expenses = 0;
  for (const t of txns) {
    if (t.type === 'credit') income += t.amount;
    else expenses += t.amount;
  }
  return { income: Math.round(income * 100) / 100, expenses: Math.round(expenses * 100) / 100 };
}

export const debitCards: DebitCard[] = [
  {
    id: '1',
    name: "John's Debit",
    last4: '7890',
    spentToday: 88.00,
  },
  {
    id: '2',
    name: "John's Debit 2",
    last4: '4321',
    spentToday: 0.00,
  },
];

export const cards: Card[] = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    holder: 'John Smith',
    expiry: '09/28',
    color: 'blue',
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '8888',
    holder: 'John Smith',
    expiry: '03/27',
    color: 'red',
  },
  {
    id: '3',
    type: 'visa',
    last4: '1234',
    holder: 'John Smith',
    expiry: '12/29',
    color: 'black',
  },
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Received',
    message: 'You received $77.50 from Rachel Smith',
    time: '2h ago',
    read: false,
  },
  {
    id: '2',
    title: 'Card Transaction',
    message: 'Your card ending in 7890 was used for $7.24 at Corner Cafe',
    time: '1d ago',
    read: false,
  },
  {
    id: '3',
    title: 'Bill Due Soon',
    message: 'Your Electric Bill of $89.00 is due in 3 days',
    time: '2d ago',
    read: true,
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'New login detected from San Francisco, CA',
    time: '3d ago',
    read: true,
  },
  {
    id: '5',
    title: 'Transfer Complete',
    message: 'Your transfer of $500.00 has been completed',
    time: '5d ago',
    read: true,
  },
];

export type Statement = {
  id: string;
  label: string;
  month: string;
};

export type StatementSection = {
  title: string;
  data: Statement[];
};

export const statementSections: StatementSection[] = [
  {
    title: '2025',
    data: [{ id: 'y2025', label: '2025 Statement', month: '2025' }],
  },
  {
    title: "December '25",
    data: [{ id: 'dec25', label: 'December Statement', month: 'Dec 2025' }],
  },
  {
    title: "November '25",
    data: [{ id: 'nov25', label: 'November Statement', month: 'Nov 2025' }],
  },
  {
    title: "October '25",
    data: [{ id: 'oct25', label: 'October Statement', month: 'Oct 2025' }],
  },
  {
    title: "September '25",
    data: [{ id: 'sep25', label: 'September Statement', month: 'Sep 2025' }],
  },
  {
    title: "August '25",
    data: [{ id: 'aug25', label: 'August Statement', month: 'Aug 2025' }],
  },
  {
    title: "July '25",
    data: [{ id: 'jul25', label: 'July Statement', month: 'Jul 2025' }],
  },
];

export type PaymentRequest = {
  id: string;
  name: string;
  initials: string;
  color: string;
  amount: number;
  status: 'open' | 'filled' | 'declined';
};

export const paymentRequests: PaymentRequest[] = [
  { id: '1', name: 'Adam White', initials: 'AW', color: '#56CCFF', amount: 300, status: 'open' },
  { id: '2', name: 'Brock Missiles', initials: 'BM', color: '#FF56AD', amount: 300, status: 'filled' },
  { id: '3', name: 'Cathy Mulford', initials: 'CM', color: '#8956FF', amount: 300, status: 'declined' },
];

export const scheduledPayments: PaymentRequest[] = [
  { id: '4', name: 'Adam White', initials: 'AW', color: '#56CCFF', amount: 300, status: 'open' },
  { id: '5', name: 'Brock Missiles', initials: 'BM', color: '#FF56AD', amount: 300, status: 'filled' },
  { id: '6', name: 'Cathy Mulford', initials: 'CM', color: '#8956FF', amount: 300, status: 'declined' },
];

export const employer: Employer = {
  name: 'Acme Corporation',
  role: 'Senior Software Engineer',
  paySchedule: 'Bi-weekly',
  lastPay: 'Feb 15, 2026',
  nextPay: 'Mar 1, 2026',
  lastAmount: 2450.0,
};
