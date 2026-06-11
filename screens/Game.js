import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground } from "react-native";
import Cell from "../components/Cell";

const imagem = require('../assets/img/imgback2.jpg');
const background = require("../assets/img/bg2.png");

const playerColors = [
    "#8C3B2F",
    "#556B2F",
    "#4A6C8A",
    "#B08A3E"
];

const winLines = [ // linhas p ganha
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //tentar achar uma forma melhor depois
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

export default function Game({ route, navigation }) {
    const { players } = route.params;
    const [tabuleiro, setTabuleiro] = useState(
        Array.from({ length: 9 }, () => ({
            small: null,//tabueliro comeca sem nada
            medium: null,
            large: null
        })));

    const [turn, setTurn] = useState(0);
    const [pecaSize, setPecaSize] = useState("small");
    const [peca, setPeca] = useState(
        Array.from({ length: players }, () => ({
            small: 3,
            medium: 3,
            large: 3
        })));

    const [vitoria, setVitoria] = useState(Array.from({ length: players }, () => 0)) //para cada posição da array colocar 0, acho que esta funcionando kkkkk ;)

    function checkWin(tabuleiro) {
        const tamanhos = ["small", "medium", "large"];
        for (let i = 0; i < 9; i++) {
            const cell = tabuleiro[i];
            if (cell.small && cell.small === cell.medium && cell.medium === cell.large) {
                return cell.small;
            }
        }
        for (let line of winLines) { //acho q funciona
            const [a, b, c] = line;
            for (let color of playerColors) {
                for (let size of tamanhos) {
                    if (
                        tabuleiro[a][size] === color &&
                        tabuleiro[b][size] === color &&
                        tabuleiro[c][size] === color
                    ) {
                        return color;
                    }
                }
                if (
                    tabuleiro[a].small === color &&
                    tabuleiro[b].medium === color &&
                    tabuleiro[c].large === color
                ) {
                    return color;
                }
                if (
                    tabuleiro[a].large === color &&
                    tabuleiro[b].medium === color &&
                    tabuleiro[c].small === color
                ) {
                    return color;
                }
            }
        }
        return null;
    }

    function calcularPorcentagem(tabuleiro) {
        let total = 9 * 3; //espacos do tabuleiro
        let ocupados = 0;
        tabuleiro.forEach(cell => {
            if (cell.small) ocupados++;
            if (cell.medium) ocupados++;
            if (cell.large) ocupados++;
        });
        return Math.floor((ocupados / total) * 100); //porcentagem do tabuleiro
    }

    function play(index) {
        let novoQuadro = [...tabuleiro];
        let novasPecas = [...peca];
        if (novasPecas[turn][pecaSize] <= 0) {
            Alert.alert("Sem peças!", "Você não tem mais peças desse tamanho.");
            return;
        }

        if (novoQuadro[index][pecaSize]) return;
        novoQuadro[index] = {
            ...novoQuadro[index],
            [pecaSize]: playerColors[turn]
        };
        novasPecas[turn][pecaSize] -= 1;
        setTabuleiro(novoQuadro);
        setPeca(novasPecas);

        const vitorioso = checkWin(novoQuadro);
        if (vitorioso) {
            const vitoriosoIndex = playerColors.indexOf(vitorioso);
            let newWins = [...vitoria];
            newWins[vitoriosoIndex] += 1;
            setVitoria(newWins);
            if (newWins[vitoriosoIndex] >= 3) {
                Alert.alert(
                    "Fim da partida!",
                    `Jogador ${vitoriosoIndex + 1} venceu com 3 pontos!`,
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                navigation.navigate("Desisao", {
                                    vencedor: vitoriosoIndex + 1,
                                }),
                        },
                    ]
                );
                return;
            }
            Alert.alert(`Jogador ${vitoriosoIndex + 1} venceu a rodada!`);
            resetar();
            return;
        }
        const empate = novoQuadro.every(cell =>
            cell.small && cell.medium && cell.large
        );
        if (empate) {
            Alert.alert("Empate!", "O tabuleiro ficou cheio.");
            resetar();
            return;
        }
        setTurn((turn + 1) % players);
    }

    function resetar() {
        setTabuleiro(
            Array.from({ length: 9 }, () => ({
                small: null,
                medium: null,
                large: null
            }))
        );
        setPeca(
            Array.from({ length: players }, () => ({
                small: 3,
                medium: 3,
                large: 3
            }))
        );
        setTurn(0);
        setPecaSize("small");
    }
    return (
        <ImageBackground
            source={background}
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={[styles.turn, { backgroundColor: playerColors[turn] }]}>
                Vez do Jogador {turn + 1}
            </Text>
            <Text style={styles.text2}>Peças:</Text>
            <View style={styles.sizeSelector}>
                <TouchableOpacity
                    style={[styles.sizeBtn, pecaSize === "small" && styles.selected]}
                    onPress={() => setPecaSize("small")}
                >
                    <Text style={styles.label}>{peca[turn].small} - Pequeno</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sizeBtn, pecaSize === "medium" && styles.selected]}
                    onPress={() => setPecaSize("medium")}
                >
                    <Text style={styles.label}>{peca[turn].medium} - Média</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sizeBtn, pecaSize === "large" && styles.selected]}
                    onPress={() => setPecaSize("large")}
                >
                    <Text style={styles.label}>{peca[turn].large} - Grande</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tabuleiro}>
                <ImageBackground source={imagem} style={styles.tabuleiro} imageStyle={styles.tabuleiro}>
                    {tabuleiro.map((cell, i) => (
                        <Cell
                            key={i}
                            cell={cell}
                            onPress={() => play(i)}
                        />
                    ))}
                </ImageBackground>
            </View>
            <View style={styles.pontos}>
                {vitoria.map((w, i) => (
                    <Text key={i} style={styles.text2}>
                        Jogador {i + 1}: <Text style={[{ color: playerColors[i] }]}>{w}</Text>
                    </Text>
                ))}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.btnReseta}
                    onPress={resetar}
                >
                    <Text style={styles.btnReseta}>Resetar Tabuleiro</Text>
                </TouchableOpacity>
                <Text style={styles.text2}>
                    Porcentagem do campo utilizado: {calcularPorcentagem(tabuleiro)}%
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#461812',
        alignItems: "center",
        justifyContent: "center",
    },
    tabuleiro: {
        width: 350,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        overflow: "hidden",
    },
    turn: {
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
        borderRadius: 15,
        padding: 5,
    },
    sizeSelector: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10,
        alignItems: "center",
    },
    label: {
        color: "white",
        fontSize: 18,
    },
    sizeBtn: {
        color: "white",
        backgroundColor: "#4d5f2f",
        padding: 10,
        borderRadius: 8,
    },
    btnReseta: {
        color: "white",
        backgroundColor: "#911515",
        padding: 5,
        borderRadius: 8,
        textAlign: "center",
    },
    selected: {
        backgroundColor: "#2c351c",
    },
    text2: {
        color: "white",
        margin: 5,
    },
    pontos: {
        flexDirection: "row",
        margin: 15,
        backgroundColor: "#251d0e",
        borderRadius: 100,
        padding: 10,
    },
});