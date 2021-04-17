import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Searchbar,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState([]);
  const [visible, setVisible] = useState(false);
  const [temp, setTemp] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json'
    );
    const json = await res.json();
    setData(json);
    setCountry(json);
  };

  const popup = (title, city) =>
    Alert.alert(title, city, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  const Item = (props) => (
    <TouchableOpacity onPress={() => popup(props.title, props.city)}>
      <View style={styles.flatList}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
          <Text style={{ paddingLeft: 10 }}>{props.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.country} city={item.city} />
  );

  const filterData = (text) => {
    setQuery(text);
    setCountry(data.filter((data) => data.country.startsWith(text)));
  };
  //console.log(data);
  //console.log(query);
  //console.log(temp);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Country</Text>
      <Searchbar
        onChangeText={filterData}
        value={query}
        placeholder="Type Here..."
      />
      <FlatList
        data={country}
        renderItem={renderItem}
        keyExtractor={(item) => item.country}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 45,
  },
  heading: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 25,
  },
  flatList: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
  },
});
