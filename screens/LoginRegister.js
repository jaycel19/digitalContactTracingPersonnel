import React, { useContext, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

import { AuthContext } from "./../context/Auth";



const LoginRegister = ({navigation}) =>{

    const [isLog] = useContext(AuthContext);

    useEffect(()=>{
        if(isLog){
            navigation.navigate("Home");
        }
    }, [])

    return(
      <View style={styles.btn}>
                    <Pressable style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 32,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: 'white',
                    }} >
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
                    }} >
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 21,
                            fontWeight: 'bold',
                            letterSpacing: 0.25,
                            color: 'blue',
                        }}>Register</Text>
                    </Pressable>
                </View>
    );
}


const styles = StyleSheet.create({
    h1Styles: {
        fontSize: 35,
        textAlign: 'center',
        backgroundColor: "rgba(118, 104, 252, 0.4)",
        fontWeight: "bold",
        color: "#5549c4",
        marginTop: 20
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
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
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
})



export default LoginRegister;