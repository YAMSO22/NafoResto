import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import db from '../database/db';

export default function StockScreen() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM inventory',
        [],
        (_, { rows }) => setStock(rows._array)
      );
    });
  }, []);

  return (
    <View>
      <Text style={{ fontSize:20, marginBottom:10 }}>Stock</Text>
      <FlatList
        data={stock}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:5 }}>
            <Text>{item.product_name}</Text>
            <Text>
              {item.quantity} {item.quantity <= item.min_threshold ? "⚠️" : ""}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
