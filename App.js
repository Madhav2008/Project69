import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>Barcode Scanner App</Text>
          <Image
            style={styles.imageIcon}
            source={{
              uri:
                'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0b6f061b7ba4c04f004383e5ad185324',
            }}></Image>
          <Text style={styles.displayText2}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : 'Scan any barcode to get its link here.'}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermissions}>
            <Text style={styles.buttonText}>Click Here To Scan</Text>
          </TouchableOpacity>
          <Text style={styles.displayText2}>
            ( Bar Code Scanner is not supported on the web. If you are having
            expo app in your phone, then you can open this app there and check
            the output. )
          </Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 8,
  },
  imageIcon: {
    width: 250,
    height: 150,
    marginLeft: 30,
    marginTop: 20,
  },
  displayText: {
    fontFamily: 'Britannic',
    fontSize: 28,
    margin: 10,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: 'yellow',
    padding: 15,
    margin: 20,
    border: 'dashed',
  },
  buttonText: {
    fontFamily: 'britannic',
    textAlign: 'center',
    fontSize: 30,
  },
  displayText2: {
    fontFamily: 'rockwell',
    fontSize: 25,
    textAlign: 'center',
  },
});
