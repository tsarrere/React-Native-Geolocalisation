import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

export default class App extends React.Component {

  state = {
    region: {
      latitude: 43.621350,
      longitude: 2.261258,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    position: {
      latitude: 43.621350,
      longitude: 2.261258,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  ajoutMarqueurs() {
    const WifiIcon = require("./assets/wifi.png")
    const WCIcon = require("./assets/toilets.png")
    const BlueIcon = require("./assets/blue-pushpin.png")
    const SnackIcon = require("./assets/snack_bar.png")

    const marqueurs = [
      { // borne WIFI MMI TD rouge
        position: { latitude: 43.620680, longitude: 2.261520 },
        icon: WifiIcon,
        label: "Borne WIFI"
      },
      { // bornes WIFI MMI central
        position: { latitude: 43.620460, longitude: 2.261850 },
        icon: WifiIcon,
        label: "Borne WIFI"
      },
      { // toilettes MMI TD rouge
        position: { latitude: 43.620780, longitude: 2.261480 },
        icon: WCIcon,
      },
      { // toilettes MMI central
        position: { latitude: 43.620580, longitude: 2.261680 },
        icon: WCIcon,
      },
      { // toilettes MMI fond couloir
        position: { latitude: 43.620400, longitude: 2.261940 },
        icon: WCIcon,
      },
      { // salle etudiants MMI
        position: { latitude: 43.620360, longitude: 2.262100 },
        icon: SnackIcon,
      },
      { // grand amphi
        position: { latitude: 43.620840, longitude: 2.261310 },
        label: "Grand amphi",
        icon: BlueIcon,
      },
      { // petit amphi
        position: { latitude: 43.620740, longitude: 2.261310 },
        label: "Petit amphi",
        icon: BlueIcon,
      },
    ]

    return marqueurs.map((m,i) => {
      return (
        <MapView.Marker
            key={i}
            coordinate={m.position}
            title={m.label}
            image={m.icon}
          />
      )
    })
  }

  _getLocationAsync() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(response => {
        if (response.status !== 'granted') {
          this.setState({ errorMessage: 'Permission to access location was denied' });
        }
        else {
          Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, (location) => {
            console.log(location)
            this.setState({
              region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              },
              position: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }
            })
          })
        }
      })
  }

  render() {
    const boundsIUT = [[43.622050, 2.260360], [43.620220, 2.262510]]
    const IUToverlay = require("./assets/IUTCastresGrisClair.png")

    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}>
          <MapView.Marker
            coordinate={this.state.position}
            title={"Marqueur"}
            description={"description"}
          />
          {this.ajoutMarqueurs()}
          <MapView.Overlay
            image={IUToverlay}
            bounds={boundsIUT}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
