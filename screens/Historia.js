import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRef, useCallback } from "react";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
const bg3 = require("../assets/img/bg2.png")

export default function Historia({ navigation, route }) {
    const { players } = route.params;
    function goTutorial() {
        navigation.navigate("Tutorial", { players });
    }
    const soundRef = useRef(null);

useFocusEffect(
    useCallback(() => {
        async function playMusic() {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/audio/mp31.mp3"),
                {
                    shouldPlay: true,
                    isLooping: true,
                }
            );

            soundRef.current = sound;
        }

        playMusic();

        return () => {
            if (soundRef.current) {
                soundRef.current.stopAsync();
                soundRef.current.unloadAsync();
                soundRef.current = null;
            }
        };
    }, [])
);
    return (
        <ImageBackground style={styles.container} source={bg3}>
            <Text style={styles.text1}>
                Em um universo corrompido, algo que um dia ja foi normal hoje está a beira do colapso, oque fará esse mundo ver a luz novamente?
            </Text>
            <Text style={styles.text1}>
                Nesta terra existe uma reliquia que promete dar poder ilimitado a quem a possuir, apenas 4 seres sabem de sua existência e farão de tudo para obte-la, a reliquia está localizada em uma das nove vilas, muito bem protegida por uma magia antiga com sigilos que nem o mais habilidoso mago conseguiria decifrar.
            </Text>
            <Text style={styles.text1}>
                Apenas o ser mais apto poderá encontra-la e tirar esse mundo das trevas ou quem sabe afunda-lo na escuridão novamente.
            </Text>
            <TouchableOpacity style={styles.button} onPress={goTutorial}>
                <Text style={styles.text}>Voltar para Tutorial</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#461812',
        alignItems: 'center',
        justifyContent: 'center'
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
    text1: {
        color: "white",
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        textAlign: "center",
    },
});