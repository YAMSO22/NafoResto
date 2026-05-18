import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import db from '../database/db';

export default function DashboardScreen({ route, navigation }) {
  const { user } = route.params;
  const [dailySales, setDailySales] = useState(0);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(total) as sum FROM sales WHERE date(created_at) = date("now")`,
        [],
        (_, { rows }) => setDailySales(rows._array[0].sum || 0)
      );
    });
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:18, marginBottom:10 }}>Bonjour {user.full_name} 👋</Text>
      <Text>CA aujourd'hui : {dailySales} FCFA</Text>
      <Button title="Vente rapide" onPress={() => navigation.navigate('Sale')} />
      <Button title="Stock" onPress={() => navigation.navigate('Stock')} />
      <Button title="Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}