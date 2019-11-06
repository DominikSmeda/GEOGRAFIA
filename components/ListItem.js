import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import zdj from './images.png'
import MyButton from './MyButton';
import { Switch } from 'react-native-gesture-handler';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: false,
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({ switch: nextProps.switch })
        this.props.map.marked = nextProps.switch;

    }

    render() {


        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={zdj}
                />
                <View style={styles.map}>
                    <Text style={{ fontWeight: '500' }}>timestamp:{this.props.map.timestamp}</Text>
                    <Text>latitude: {this.props.map.latitude}</Text>
                    <Text>longitude:{this.props.map.longitude}</Text>
                </View>
                <Switch value={this.state.switch} onValueChange={(newVal) => {
                    this.setState({ switch: newVal })
                    // !this.props.switch=this.props.switch
                    this.props.map.marked = newVal;
                }} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10
    },
    map: {
        flexDirection: "column",
        justifyContent: "flex-start",
    }
})
export default ListItem;
