import axios from "axios";
import React, { useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./../context/Auth";

const Login = ({navigation}) =>{
    const LOGINURL = "https://whispering-crag-31764.herokuapp.com/personnel/security/login";
    const [personnelInfo, setPersonnelInfo] = useState({
        email: "",
        password: ""
    })
    const {isLog, setIsLog, setLoggedSecurity} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleClick = () =>{
        navigation.navigate("Register");
    }
    const handleLogin = () =>{
        async function logIn(){
            setLoading(true);
            try{
                if(personnelInfo.email !== "" || personnelInfo.password !== ""){
                    const res = await axios.post(LOGINURL, personnelInfo);
                    setLoading(false);
                    if(loading === false){
                        if(res.data === false){ 
                            alert("Error: Wrong email! or wrong password!");
                            setIsLog(false);
                        }else if(res.data.isLog === true){
                            alert("Logged in");
                            setIsLog(true);
                            setLoggedSecurity(res.data.name);
                            navigation.navigate("Scanner");
                        }
                    }
                }else{
                    alert("Error: Empty fields! Please fill out all the fields");
                    setLoading(false);
                }
            }catch(error){
                console.error(error.request?._response);
            }
        }
        logIn();
    }
    return(
        <SafeAreaView>
            <KeyboardAvoidingView>
            <ScrollView>
                <Text style={styles.h1Styles} >DIGITAL CONTACT TRACING</Text>
                <Text style={styles.h2Styles} >Security Personnel</Text>
                    <View><View style={styles.inputStyles}>
                        <View style={styles.textInput}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                style={styles.input}
                                onChangeText={newEmail => setPersonnelInfo((prev)=>{
                                    return {
                                        email: newEmail,
                                        password: prev.password
                                    }
                                })}
                                value={personnelInfo.email}
                                placeholder="Email:"
                                keyboardType="default"
                                />
                            </View>
                        </View>
                        <View style={styles.textInput}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                style={styles.input}
                                onChangeText={newPassword => setPersonnelInfo((prev)=>{
                                    return {
                                        email: prev.email,
                                        password: newPassword
                                    }
                                })}
                                value={personnelInfo.password}
                                placeholder="Password:"
                                keyboardType="default"
                                secureTextEntry={true}
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.button}>
                        <Pressable style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: 'white',
                        }} onPress={handleLogin}>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 21,
                                fontWeight: 'bold',
                                letterSpacing: 0.25,
                                color: 'blue',
                            }}>{loading ? "loading...":"Login"}</Text>
                        </Pressable>
                        <Pressable style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: 'white',
                            marginLeft: 3
                        }} onPress={handleClick}>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 21,
                                fontWeight: 'bold',
                                letterSpacing: 0.25,
                                color: 'blue',
                            }}>Register</Text>
                        </Pressable>
                    </View>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
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
    inputStyles: {
        margin: 5,
        padding: 2,
        borderWidth: 1,
        borderColor: "blue",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 20,
        backgroundColor: "white"

    },
    textInput: {
        width: "100%",
        height: 20,
        margin: 20
    },
    button: {
        flexDirection: "row",
        marginLeft: "auto",
        marginRight: 5
    },
    btn: {
        margin: 20,
    },
    input: {
        width: "100%",
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "blue",
        padding: 10
      },
      inputContainer:{
        maxWidth: 400,
        display: 'flex',
        justifyContent: 'center'
    }
})


export default Login;