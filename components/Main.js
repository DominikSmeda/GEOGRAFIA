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
            'myfont': require('./myfont.ttf'),
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
                                <Text style={[styles.text, { fontFamily: 'myfont', fontSize: 50, color: 'white' }]}>GeoMap App</Text>
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
        fontSize: 15,
        color: 'white',
        textAlign: "center"
    },
    header: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'steelblue'
    },
    main: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
export default Main
