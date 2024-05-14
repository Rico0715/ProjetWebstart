import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <View>
        {this.state.persons.map(person => (
          <Text key={person.id} style={styles.text}>{person.name}</Text>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'yellow' // Couleur jaune
  }
});
