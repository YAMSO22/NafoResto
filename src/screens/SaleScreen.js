import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import db from '../database/db';
import * as uuid from 'react-native-uuid';

export default function SaleScreen({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [basket, setBasket] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM menu_items WHERE available = 1',
        [],
        (_, { rows }) => setMenu(rows._array)
      );
    });
  }, []);

  useEffect(() => {
    let t = 0;
    Object.entries(basket).forEach(([id, qty]) => {
      const item = menu.find(m => m.id === id);
      if (item) t += item.price * qty;
    });
    setTotal(t);
  }, [basket, menu]);

  const addToBasket = (id) => {
    setBasket(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleSell = () => {
    const saleId = uuid.v4();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO sales (id, total, payment_method, created_at) VALUES (?, ?, ?, datetime("now"))',
        [saleId, total, "Espèces"]
      );
      Object.entries(basket).forEach(([id, qty]) => {
        const item = menu.find(m => m.id === id);
        if (item) tx.executeSql(
          'INSERT INTO sale_items (id, sale_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
          [uuid.v4(), saleId, id, qty, item.price]
        );
      });
    }, undefined, () => {
      alert('Vente enregistrée !');
      setBasket({});
    });
  };

  return (
    <View>
      <Text style={{ fontSize:20, marginBottom:10 }}>Vente rapide</Text>
      <FlatList
        data={menu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:5 }}>
            <Text>{item.name}</Text>
            <Button title="+" onPress={() => addToBasket(item.id)} />
            <Text>{basket[item.id] || 0}</Text>
          </View>
        )}
      />
      <Text>Total : {total} FCFA</Text>
      <Button title="Valider la vente" onPress={handleSell} disabled={total === 0} />
    </View>
  );
}
