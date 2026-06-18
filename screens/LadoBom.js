import { useState, useEffect } from "react";
import {
    View,
    Text, StyleSheet, TouchableOpacity,
    Image,
    ImageBackground
} from "react-native";

const back = require("../assets/img/imgback.jpg");
const back2 = require("../assets/img/imgback.png");

export default function LadoBom({ route, navigation }) {
    function goTomain() {
        navigation.navigate("Home");
    }
    return (
        <ImageBackground style={styles.container} source={back2} imageStyle={{ opacity: 0.8 }}>
            <Text style={styles.txt}>Voce sente o poder fluir sobre voce ... Você livrou o mundo de toda a Escuridão</Text>
            <Image source={back} style={styles.img} />
            <TouchableOpacity style={styles.button} onPress={goTomain}>
                <Text style={styles.text}>Voltar para o Menu</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: 400,
        height: 400,
    },
    txt: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        padding: 10,
        backgroundColor: "#6B4F2A",
        margin: 15,
        borderRadius: 20,
    },
    button: {
        color: "white",
        backgroundColor: "#137FA8",
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
        width: 200,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});