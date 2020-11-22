import React from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default class HomeScreen extends React.Component {

    signOut = async () => {
        console.log('signout');
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container} >
                <Text>{'Hi ' + this.props.navigation.getParam('userDetails').name + ','} </Text>
                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text style={styles.signOut}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOut: {
        padding: 15,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginTop: 20,
        fontSize: 17
    }
});