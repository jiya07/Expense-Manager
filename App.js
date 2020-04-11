
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends Component {
  state = {
    inputExp1: '',
    inputExp2: '',
    inputName1: '',
    inputName2: '',
    highestTotaluser: '',
    expenseDifference: 0,
    user_1: {
      name: "John",
      expenses: []
    },
    user_2: {
      name: 'Doe',
      expenses: []
    }
  }


  storeExp1 = () => {
    if (this.state.user_1.expenses.length < 3 && /\S/.test(this.state.inputExp1)) {
      this.setState(previousState => ({
        inputExp1:'',
        user_1: { ...previousState.user_1, expenses: [...previousState.user_1.expenses, this.state.inputExp1] }
      }))
      this.setState({ inputExp1: '' })
    }
    else if(this.state.user_1.expenses.length >= 3){
      Alert.alert('Can not add more than three expenses')
    }
    else {
      Alert.alert("Can't add")
    }
  }
  storeExp2 = () => {
    if (this.state.user_2.expenses.length < 3 && /\S/.test(this.state.inputExp2)) {
      this.setState(previousState => ({
        inputExp2: '',
        user_2: { ...previousState.user_2, expenses: [...previousState.user_2.expenses, this.state.inputExp2] }
      }))
    }
    else if(this.state.user_2.expenses.length >= 3){
      Alert.alert('Can not add more than three expenses')
    }
    else {
      Alert.alert("Can't add")
    }
  }
  getTotal = (user) => {
    let total = 0;
    this.state[user].expenses.map((item) => {
      total += parseFloat(item);
    })
    return total
  }
  changeName1 = () => {
    if (/\S/.test(this.state.inputName1)) {
      this.setState(previousState => ({
        user_1: { name: this.state.inputName1, expenses: [...previousState.user_1.expenses] },
        inputName1: '',
      }))
    }
    else {
      Alert.alert("Name field can't be empty")
    }
  }
  changeName2 = () => {
    if (/\S/.test(this.state.inputName2)) {
      this.setState(previousState => ({
        user_2: { name: this.state.inputName2, expenses: [...previousState.user_2.expenses] },
        inputName2: '',
      }))
    }
    else {
      Alert.alert("Name field can't be empty")
    }
  }
  
  showResult = () => {
    if (this.getTotal('user_1') > this.getTotal('user_2')) {
      this.setState({
        highestTotaluser: (this.state.user_1.name)+' by',
        expenseDifference: (this.getTotal('user_1') - this.getTotal('user_2'))
      })
    }
    else if (this.getTotal('user_2') > this.getTotal('user_1')) {
      this.setState({
        highestTotaluser: (this.state.user_2.name)+' by',
        expenseDifference: (this.getTotal('user_2') - this.getTotal('user_1'))
      })
    }
    else if (this.getTotal('user_1') === 0 && this.getTotal('user_2') === 0) {
      Alert.alert('Add Expenses please')
    }
    else {
      // Mean both, have spent equal and not 0
      this.setState({
        highestTotaluser: "Both Have Spent Same",
        expenseDifference: this.getTotal('user_1')
      })
    }
  }

  


  render() {
    return (
      <View style={styles.mainContainer}>
        <View><Text style={styles.heading}>EXPENSE MANAGER</Text></View>
        <View style={styles.expenseContainer}>
          <View>
            <View style={styles.expenseBox}>
              <Text style={styles.name}>{this.state.user_1.name}</Text>
              <Text style={styles.expense}>{this.state.user_1.expenses.map((item) => item + '\n')}</Text>
            </View>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Add expense"
                value={this.state.inputExp1}
                onChangeText={(val) => { this.setState({ inputExp1: val }) }}
                style={styles.inputField}
              />
              <View style={styles.button}><Button title="Add" color="black" onPress={this.storeExp1} /></View>
            </View>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Change name"
                value={this.state.inputName1}
                onChangeText={(val) => { this.setState({ inputName1: val }) }}
                style={styles.inputField}
              />
              <View style={styles.button}>
                <Button title="Change" color="black" onPress={this.changeName1} />
              </View>
            </View>
          </View>

          <View>
            <View style={styles.expenseBox}>
              <Text style={styles.name}>{this.state.user_2.name}</Text>
              <Text style={styles.expense}>{this.state.user_2.expenses.map((item) => item + '\n')}</Text>
            </View>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Add expense"
                value={this.state.inputExp2}
                onChangeText={(val) => { this.setState({ inputExp2: val }) }}
                style={ styles.inputField}
              />
              <View style={styles.button}>
                <Button title="Add" color="black" onPress={this.storeExp2} />
              </View>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Change name"
                value={this.state.inputName2}
                onChangeText={(val) => { this.setState({ inputName2: val }) }}
                style={styles.inputField}
              />
              <View style={styles.button}>
                <Button title="Change" color="black" onPress={this.changeName2} />
              </View>
            </View>
          </View>


        </View>
        <View>
          <View style={styles.resultButton}>
            <Button title="Click to show who has more" color="black" onPress={this.showResult} />
          </View>
          {this.state.expenseDifference > 0 ?
            <Text style={styles.result}>{this.state.highestTotaluser} {this.state.expenseDifference}
            </Text> : undefined}

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    marginTop: 50
  },
  heading:{
    textAlign:"center",
    fontSize:20,
    fontWeight:"300",
    margin:5
  },
  expenseContainer:{
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  expenseBox:{
    height: 550
  },
  expense:{
    fontSize:25
  },
  inputBox:{
    flexDirection: "row",
    margin: 5
  },
  inputField:{
    textAlign:"center",
    width: 100
  },
  name: {
    fontSize: 30,
    backgroundColor: "#B7E9F7",
    textAlign: "center"
  },
  button: {
    fontSize: 10,
    backgroundColor: "#DBF3FA",
    height: 40,
    justifyContent: "center",
    width: 80,
    borderRadius: 10

  },
  resultButton: {
    marginHorizontal: 50,
    marginTop: 10,
    fontSize: 10,
    backgroundColor: "#DBF3FA",
    height: 40,
    width: 300,
    borderRadius: 10
  },
  result:{
    fontSize: 20,
    margin:10,
    textAlign:"center",
    fontWeight:"500",
    color:"blue"
  }
})