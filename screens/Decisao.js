import { useState, useEffect } from "react";
import {
    View,
    Text,StyleSheet,TouchableOpacity,} from "react-native";

export default function Desisao({ route, navigation }) {
    const { vencedor } = route.params;
    function goDecisão1() {
        navigation.navigate("LadoBom");
    }
    function goDecisão2() {
        navigation.navigate("LadoRuim");
    }
    const mensagens = [
        `O Jogador ${vencedor} foi digno de conquistar a relíquia.`,
        "O futuro dessas terras está em suas mãos...",
        "Qual lado você escolhe?"
    ];
    const [indice, setIndice] = useState(0);
    const [textoExibido, setTextoExibido] = useState("");

    useEffect(() => {
        let i = 0;
        setTextoExibido("");
        const intervalo = setInterval(() => {
            i++;
            setTextoExibido(mensagens[indice].slice(0, i));
            if (i >= mensagens[indice].length) {
                clearInterval(intervalo);
            }
        }, 40);
        return () => clearInterval(intervalo);
    }, [indice]);

    function avancar() {
        if (textoExibido.length < mensagens[indice].length) {
            return;
        }

        if (indice < mensagens.length - 1) {
            setIndice(indice + 1);
        }
    }

    const ultimaMensagem =
        indice === mensagens.length - 1 &&
        textoExibido.length === mensagens[indice].length;

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={avancar}
        >
            <Text style={styles.texto}>{textoExibido}</Text>
            {!ultimaMensagem &&
                textoExibido.length === mensagens[indice].length && (
                    <Text style={styles.dica}>
                        Toque para continuar ▼
                    </Text>
                )}
            {ultimaMensagem && (
                <View style={styles.botoes}>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={goDecisão1}
                    >
                        <Text style={styles.textoBotao}>
                            Salvar o Reino
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botao2}
                        onPress={goDecisão2}
                    >
                        <Text style={styles.textoBotao}>
                            Salvar a sí mesmo
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    texto: {
        color: "#FFF",
        fontSize: 26,
        textAlign: "center",
        lineHeight: 38,
    },
    dica: {
        marginTop: 30,
        color: "#888",
        fontSize: 16,
    },
    botoes: {
        marginTop: 50,
        width: "100%",
        gap: 15,
    },
    botao: {
        backgroundColor: "#6B4F2A",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    textoBotao: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    botao2:{
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#461812",
    }
});