import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import img1 from "../assets/img/img1.png"
import img2 from "../assets/img/img2.png"
import img3 from "../assets/img/img3.png"

export default function Tutorial({ navigation, route }) {
    const { players } = route.params;
    function goToGame() {
        navigation.navigate("Game", { players });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
                Otrio é um jogo de estratégia para<Text style={styles.span1}> 2 </Text>a <Text style={styles.span4}>4 </Text> jogadores semelhante ao jogo da velha, porém mais complexo,
                pois cada jogador possui peças de três tamanhos diferentes
                <Text style={styles.span1}> pequeno </Text>, <Text style={styles.span2}>médio </Text>e <Text style={styles.span3}>grande </Text>
                e deve colocá-las em um tabuleiro 3x3 ao longo das rodadas; o objetivo é formar uma combinação vencedora antes dos adversários,
                o que pode acontecer ao alinhar três peças do mesmo tamanho, ao alinhar três peças do mesmo jogador com tamanhos diferentes ou ao empilhar,
                em uma mesma casa, três peças de tamanhos diferentes, exigindo planejamento e atenção às jogadas dos outros participantes.
            </Text>
            <Text style={styles.text1}>Possiveis vitorias exemplos:</Text>
            <View style={styles.container2}>
                <View style={styles.container3}>
                    <Image source={img1} style={styles.img} />
                    <Text style={styles.textP}>Em linha crescente</Text>
                </View>
                <View style={styles.container3}>
                    <Image source={img2} style={styles.img} />
                    <Text style={styles.textP}>Todos no centro</Text>
                </View>
                <View style={styles.container3}>
                    <Image source={img3} style={styles.img} />
                    <Text style={styles.textP}>Em linha normal</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={goToGame}>
                <Text style={styles.text}>Começar Jogo</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262B2D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        flexDirection: "row",
    },
    container3:{
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        color: "white",
        backgroundColor: "#137FA8",
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
    },
    text1: {
        color: "white",
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
    },
    textP: {
        fontSize: 13,
        color: "white",
    },
    span1: {
        color: "#ff0000",
    },
    span2: {
        color: "#00ff00",
    },
    span3: {
        color: "#0084ff",
    },
    span4: {
        color: "#8400ff",
    },
    img: {
        width: 100,
        height: 100,
        margin: 10,
    }
});