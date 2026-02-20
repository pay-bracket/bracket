import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { TransactionItem } from '@/components/transaction-item';
import { Transaction } from '@/lib/mock-data';

type TransactionListProps = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  const router = useRouter();

  return (
    <View>
      {transactions.map((txn) => (
        <TransactionItem
          key={txn.id}
          transaction={txn}
          onPress={() => router.push({ pathname: '/transaction/[id]', params: { id: txn.id } })}
        />
      ))}
    </View>
  );
}
