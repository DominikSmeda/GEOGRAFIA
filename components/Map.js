import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {

    static navigationOptions = {
        title: "Lokalizacja na mapie",
        headerStyle: {
            backgroundColor: "steelblue",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        let markers = this.props.navigation.state.params.markers.map((elem, i) => {

            return (<MapView.Marker key={i}
                coordinate={{
                    latitude: elem.latitude,
                    longitude: elem.longitude,
                }}
                title={"position" + i}
                description={"opis" + i}
            />)
        })
        return (

            <MapView
                style={{ flex: 1 }}
            >
                {markers}

            </MapView>

        );
    }
}

export default Map;
