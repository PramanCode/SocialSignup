import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';
import { createStackNavigator } from 'react-navigation-stack';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        isLoading: false
    }

    fetchUserDetails = async (userId, token) => {
        await fetch('https://graph.facebook.com/' + userId + '?fields=id,name&access_token=' + token)
            .then(response => response.json())
            .then(userDetails => {
                console.log(JSON.stringify(userDetails));
                this.setState({ isLoading: false });
                this.props.navigation.navigate('Home', { 'userDetails': userDetails });
            })
            .catch((e) => Alert.alert('Error: ', 'An Error Occured: ' + e))
    }

    facebookSignIn = async () => {
        this.setState({ isLoading: true });
        await Facebook.initializeAsync({ 'appId': '190883222506411', 'appName': 'SocialSignup' })
            .then(async () => {
                await Facebook.logInWithReadPermissionsAsync()
                    .then(async (response) => {
                        if (response.type == 'success') {
                            await AsyncStorage.setItem('userId', response.userId);
                            this.fetchUserDetails(response.userId, response.token);
                        }
                    })
                    .catch((e) => Alert.alert('Error: ', 'An Error Occured: ' + e))
            })
            .catch((e) => Alert.alert('Error: ', 'An Error Occured: ' + e))
    }

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.isLoading ?
                        <ActivityIndicator size={'large'} />
                        :
                        <View>
                            <Text>Login</Text>
                            <TouchableOpacity onPress={() => this.facebookSignIn()}>
                                <Text style={styles.facebook}>Facebook</Text>
                            </TouchableOpacity>
                        </View>
                }
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
    facebook: {
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginTop: 20
    }
});
