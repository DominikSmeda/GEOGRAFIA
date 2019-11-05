import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MyButton from './MyButton'
import { Switch } from 'react-native-gesture-handler';
import * as Location from "expo-location";
import { AsyncStorage } from "react-native"
import ListItem from './ListItem';
import newLinking from 'expo/build/Linking/Linking';

class List extends Component {
    static navigationOptions = {
        // header: null,
        title: "Zapis pozycji",
        headerStyle: {
            backgroundColor: "blue",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            maps: [],
            switch: false,
            dataForMap: []

        };

        this.getAllData();
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();

        let stores = await AsyncStorage.multiGet(keys);

        let maps = stores.map((elem) => {
            let value = JSON.parse(elem[1]);

            return {
                timestamp: value.timestamp,
                latitude: value.coords.latitude,
                longitude: value.coords.longitude,
                marked: false
            }

        });

        this.setState({ maps: maps })


    }

    setData = async (pos) => {
        await AsyncStorage.setItem("location-" + Math.random() * 100, pos);
        this.getAllData();
    }

    getPosition = async () => {
        let pos = await Location.getCurrentPositionAsync({})

        this.setData(JSON.stringify(pos));
    }
    removePosition = async () => {
        let keys = await AsyncStorage.getAllKeys();

        AsyncStorage.multiRemove(keys, err => {
            if (err) {
                alert("Lista jest pusta")
            } else {
                this.getAllData();
            }
        })
    }
    render() {
        console.log('render list');

        return (
            <View style={styles.container}>
                <View style={styles.buttons}>

                    <MyButton text="Pobierz i zapisz pozycje" onClick={this.getPosition}></MyButton>
                    <MyButton text="Usuń wszystkie mapy" onClick={this.removePosition}></MyButton>
                </View>
                <View style={styles.buttons}>
                    <MyButton text="Przejdź do mapy" onClick={() => {
                        let markers = []

                        for (let marker of this.state.maps) {
                            if (marker.marked) {
                                markers.push(marker)
                            }

                        }
                        console.log(markers);

                        this.props.navigation.navigate("Map", { markers: markers })

                    }}></MyButton>
                    <Switch value={this.state.switch} style={{ position: "absolute", right: 0 }} onValueChange={() => {
                        this.setState({ switch: !this.state.switch })
                    }} />


                </View>
                <View style={styles.savedMaps}>

                    <FlatList noname={this.state.switch}
                        data={
                            this.state.maps

                        }

                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <ListItem switch={this.state.switch} map={item} />}

                    />
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },

    savedMaps: {
        flex: 8,
        flexDirection: 'column'
    }

})

export default List;


