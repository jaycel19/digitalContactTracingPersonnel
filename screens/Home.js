import React, { useState, useEffect, useContext } from 'react';
import { 
    Alert,
    Modal,
    Pressable,
    Text, 
    View, 
    StyleSheet, 
    Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './../context/Auth';
import axios from 'axios';

export default function Home({navigation}) {

    const ADDRECORDURL = "https://whispering-crag-31764.herokuapp.com/personnel/security/addrecord";

    const {isLog, loggedSecurity} = useContext(AuthContext)
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState({
        fullName: "",
        address: "",
        contact: "",
        timeIn: ""
    });
    useEffect(() => {
        (async () => {
            setScanned(false)
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
            setScanned(true);
            const jsonData = JSON.parse(data);
            const currentDate = new Date();
            let hours = "";
            let mins = "";
            let day = ""
            let month = "";
            const year = currentDate.getFullYear();
            if(currentDate.getDate() < 10){
                day = "0"+currentDate.getDate();
            }else{
                day = currentDate.getDate();
            }
            if((currentDate.getMonth()+1) < 10){
                month = "0"+(currentDate.getMonth()+1);
            }else{
                month = currentDate.getMonth()+1;
            }
            if(currentDate.getHours() < 10){
                hours = "0"+currentDate.getHours();
            }else{
                hours = currentDate.getHours();
            }
            if(currentDate.getMinutes() < 10){
                mins = "0"+mins;
            }else{
                mins = currentDate.getMinutes();
            }
            if(!jsonData.fullName || !jsonData.address || !jsonData.contact){
                alert("Invalid QrCode");
                setScanned(false);
                setQrData({})
            }else{
                setQrData({
                    fullName: jsonData.fullName,
                    address: jsonData.address,
                    contact: jsonData.contact,
                    loggedSecurity: loggedSecurity,
                    dateIn: `${day}-${month}-${year}`,
                    timeIn: hours + ":" + mins
                });
            }
            
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleLogged = () => {
        navigation.navigate("Login");
    }

    const handleRegister = () => {
        navigation.navigate("Register");
    }

    const handleSaveData = () =>{
        async function saveData(){
            try{
                const res = await axios.post(ADDRECORDURL, qrData);
                if(res.data === true){
                    alert("Added!");
                    setScanned(false);
                }else{
                    alert("error")
                }
            }catch(error){
                console.error(error.request?._response);
            }
        }
        saveData();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1Styles} >DIGITAL CONTACT TRACING</Text>
            <Text style={styles.h2Styles} >SECURITY</Text>

        {scanned && <Button title="Tap to Scan" onPress={() => setScanned(false)} />}
        
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={scanned}
                        onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!scanned);
                        }}>
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalText}>
                                <Text>Full Name: {qrData.fullName}</Text>
                                <Text>Address: {qrData.address}</Text>
                                <Text>Contact: {qrData.contact}</Text>
                            </View>
                            <View style={styles.buttonView}>
                            <Pressable
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={handleSaveData}>
                            <Text style={styles.textStyle}>Save</Text>
                            </Pressable>
                            <Pressable
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => setScanned(!scanned)}>
                            <Text style={styles.textStyle}>CANCEL</Text>
                            </Pressable>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>

        {!isLog ? (
            <View style={styles.btn}>
                    
                    <Pressable style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 32,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: 'white',
                    }} onPress={handleLogged}>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 21,
                            fontWeight: 'bold',
                            letterSpacing: 0.25,
                            color: 'blue',
                        }}>Login</Text>
                    </Pressable>
                    <Pressable style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 32,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: 'white',
                        marginTop: 10,
                    }} onPress={handleRegister}>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 21,
                            fontWeight: 'bold',
                            letterSpacing: 0.25,
                            color: 'blue',
                        }}>Register</Text>
                    </Pressable>
                </View>
        ):(<BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />)}           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  barCodeView: {
    width: '100%', 
    height: '50%', 
    marginBottom: 40
  },
  h1Styles: {
    fontSize: 35,
    textAlign: 'center',
    backgroundColor: "rgba(118, 104, 252, 0.4)",
    fontWeight: "bold",
    color: "#5549c4"
    },
    h2Styles: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#5549c4"
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: 400,
      height: 650,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonModal: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      margin: 10
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: 'white',
    },
    textStyle: {
      color: 'blue',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    buttonView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
    }
});
