import React, { createContext, useContext, useMemo, useReducer } from 'react';
import {
  Account,
  Card,
  Contact,
  DebitCard,
  Notification,
  PaymentRequest,
  Transaction,
  account as seedAccount,
  cards as seedCards,
  contacts as seedContacts,
  debitCards as seedDebitCards,
  notifications as seedNotifications,
  paymentRequests as seedPaymentRequests,
  scheduledPayments as seedScheduledPayments,
  transactions as seedTransactions,
  groupTransactionsByDate,
  getTransactionSummary,
} from './mock-data';

export type AppState = {
  account: Account;
  transactions: Transaction[];
  paymentRequests: PaymentRequest[];
  scheduledPayments: PaymentRequest[];
  contacts: Contact[];
  notifications: Notification[];
  cards: Card[];
  debitCards: DebitCard[];
};

type SendMoneyPayload = {
  contactId: string;
  contactName: string;
  contactInitials: string;
  contactColor: string;
  amount: number;
  memo: string;
};

type CreateInvoicePayload = {
  contactId: string;
  contactName: string;
  contactInitials: string;
  contactColor: string;
  amount: number;
  lineItems: { id: string; description: string; amount: number }[];
};

type AddContactPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  accountNumber?: string;
  routingNumber?: string;
  notes?: string;
};

type Action =
  | { type: 'SEND_MONEY'; payload: SendMoneyPayload }
  | { type: 'CREATE_INVOICE'; payload: CreateInvoicePayload }
  | { type: 'ADD_CONTACT'; payload: AddContactPayload };

let nextTxnId = 100;
let nextNotifId = 100;
let nextPrId = 100;
let nextContactId = 100;

function generateTxnId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `TXN-${y}${m}${d}-${String(nextTxnId++).padStart(3, '0')}`;
}

function todayStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SEND_MONEY': {
      const { contactName, contactInitials, contactColor, amount, memo } = action.payload;
      const transactionId = generateTxnId();
      const newTxn: Transaction = {
        id: String(nextTxnId),
        icon: contactInitials,
        iconType: 'initials',
        color: contactColor,
        name: contactName,
        category: 'transfer',
        amount,
        date: todayStr(),
        type: 'debit',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(),
        transactionId,
        notes: memo || undefined,
      };
      const newNotif: Notification = {
        id: String(nextNotifId++),
        title: 'Money Sent',
        message: `You sent $${amount.toFixed(2)} to ${contactName}`,
        time: 'Just now',
        read: false,
      };
      return {
        ...state,
        account: { ...state.account, balance: Math.round((state.account.balance - amount) * 100) / 100 },
        transactions: [newTxn, ...state.transactions],
        notifications: [newNotif, ...state.notifications],
      };
    }
    case 'CREATE_INVOICE': {
      const { contactId, contactName, contactInitials, contactColor, amount, lineItems } = action.payload;
      const newPr: PaymentRequest = {
        id: String(nextPrId++),
        name: contactName,
        initials: contactInitials,
        color: contactColor,
        amount,
        status: 'open',
        contactId,
        lineItems,
        createdAt: todayStr(),
      };
      const newNotif: Notification = {
        id: String(nextNotifId++),
        title: 'Invoice Sent',
        message: `Invoice for $${amount.toFixed(2)} sent to ${contactName}`,
        time: 'Just now',
        read: false,
      };
      return {
        ...state,
        paymentRequests: [newPr, ...state.paymentRequests],
        notifications: [newNotif, ...state.notifications],
      };
    }
    case 'ADD_CONTACT': {
      const { firstName, lastName, email, accountNumber, routingNumber, notes } = action.payload;
      const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
      const colorPool = ['#56CCFF', '#FF9757', '#A78BFA', '#FF56AD', '#5ADF8D', '#FFD857', '#60A5FA', '#8956FF', '#2DD4BF', '#F472B6', '#ABFF57'];
      const color = colorPool[nextContactId % colorPool.length];
      const newContact: Contact = {
        id: `c${nextContactId++}`,
        firstName,
        lastName,
        initials,
        color,
        email: email || undefined,
        accountNumber: accountNumber || undefined,
        routingNumber: routingNumber || undefined,
        notes: notes || undefined,
      };
      return {
        ...state,
        contacts: [newContact, ...state.contacts],
      };
    }
    default:
      return state;
  }
}

const initialState: AppState = {
  account: seedAccount,
  transactions: seedTransactions,
  paymentRequests: seedPaymentRequests,
  scheduledPayments: seedScheduledPayments,
  contacts: seedContacts,
  notifications: seedNotifications,
  cards: seedCards,
  debitCards: seedDebitCards,
};

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useAccount() {
  return useApp().state.account;
}

export function useTransactions() {
  return useApp().state.transactions;
}

export function useContacts() {
  return useApp().state.contacts;
}

export function usePaymentRequests() {
  return useApp().state.paymentRequests;
}

export function useScheduledPayments() {
  return useApp().state.scheduledPayments;
}

export function useNotifications() {
  return useApp().state.notifications;
}

export function useCards() {
  return useApp().state.cards;
}

export function useDebitCards() {
  return useApp().state.debitCards;
}

export { groupTransactionsByDate, getTransactionSummary };
