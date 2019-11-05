import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";

import MyButton from './MyButton'




class Main extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };
    }
    componentWillMount = async () => {
        await Font.loadAsync({
            'myfont': require('./Pacifico.ttf'),
        });
        this.setState({ fontloaded: true })
        this.setPermissions()
    }


    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    {
                        !this.state.fontloaded ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            <View>
                                <Text style={[styles.text, { fontFamily: 'myfont', fontSize: 60, color: 'white' }]}>GeoMap App</Text>
                                <Text style={styles.text}>find and save your position</Text>
                            </View>
                    }

                </View>
                <View style={styles.main}>

                    <MyButton bgc='white' text="Start" onClick={() => { this.props.navigation.navigate("List") }}></MyButton>
                </View>
            </View>


        );
    }
}
const styles = {
    container: {
        flex: 1
    },
    text: {
        fontSize: 30,
        color: 'white'
    },
    header: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'darkblue'
    },
    main: {
        flex: 3
    }
}
export default Main
