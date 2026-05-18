import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../services/auth';

export default function LoginScreen({ navigation }) {
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    login(pin, (user) => {
      if (user) navigation.replace('Dashboard', { user });
      else Alert.alert("Erreur", "PIN incorrect");
    });
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>NafoResto</Text>
      <TextInput value={pin} onChangeText={setPin}
        placeholder="Entrer votre code PIN"
        secureTextEntry
        keyboardType="numeric"
        style={{borderWidth:1, width:200, borderRadius:5, textAlign:'center', marginBottom:10}}
      />
      <Button title="Connexion" onPress={handleLogin} />
    </View>
  );
}