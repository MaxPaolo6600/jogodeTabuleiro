import { useState, useEffect } from "react";
import {
    View,
    Text, StyleSheet, TouchableOpacity,
    Image,
    ImageBackground
} from "react-native";

const back = require("../assets/img/imgback3.jpg");
const back2 = require("../assets/img/bg2.png");

export default function LadoRuim({ route, navigation }) {
    function goTomain() {
            navigation.navigate("Home");
        }
        return (
            <ImageBackground style={styles.container} source={back2} imageStyle={{ opacity: 0.2 }}>
                <Text style={styles.txt}>Voce optou por deixar sua escuridão vencer... Agora o mundo todo está sob suas mãos.</Text>
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
        backgroundColor: "#111",
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
        backgroundColor: "#461812",
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