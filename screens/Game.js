import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Touchable, TouchableOpacity } from "react-native";
import Cell from "../components/Cell";

const playerColors = [
    "#ff0000",
    "#00ff00",
    "#0084ff",
    "#8400ff"
];
const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export default function Game({ route }) {
    const { players } = route.params;
    const [tabuleiro, setTabuleiro] = useState(
        Array.from({ length: 9 }, () => ({
            small: null,
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
            if (
                cell.small &&
                cell.small === cell.medium &&
                cell.medium === cell.large
            ) {
                return cell.small;
            }
        }
        for (let line of winLines) {
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
            Alert.alert(`Jogador ${vitoriosoIndex + 1} venceu!`);
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

        setTurn(0); // opcional par volta pro jogador 1
        setPecaSize("small"); // opcional para volta pro tamanho padrão
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.turn, { backgroundColor: playerColors[turn] }]}>
                Vez do Jogador {turn + 1}
            </Text>
            <Text style={styles.text2}>Você tem essas peças sobrando:</Text>
            <Text style={styles.text2}>
                Pequenas: {peca[turn].small} |
                Médias: {peca[turn].medium} |
                Grandes: {peca[turn].large}
            </Text>
            <View style={styles.sizeSelector}>
                <Text style={styles.label}>Peça:</Text>
                <Text
                    style={[styles.sizeBtn, pecaSize === "small" && styles.selected]}
                    onPress={() => setPecaSize("small")}
                >
                    Pequena
                </Text>
                <Text
                    style={[styles.sizeBtn, pecaSize === "medium" && styles.selected]}
                    onPress={() => setPecaSize("medium")}
                >
                    Média
                </Text>
                <Text
                    style={[styles.sizeBtn, pecaSize === "large" && styles.selected]}
                    onPress={() => setPecaSize("large")}
                >
                    Grande
                </Text>
            </View>
            <View style={styles.tabuleiro}>
                {tabuleiro.map((cell, i) => (
                    <Cell
                        key={i}
                        cell={cell}
                        onPress={() => play(i)}
                    />
                ))}
            </View>
            <View style={styles.pontos}>
                {vitoria.map((w, i) => (
                    <Text key={i} style={styles.text2}>
                        Jogador {i + 1}: <Text style={[{ color: playerColors[i] }]}>{w}</Text>
                    </Text>
                ))}
            </View>
            <TouchableOpacity
                style={styles.btnReseta}
                onPress={resetar}
            >
                <Text style={styles.btnReseta}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262B2D",
        alignItems: "center",
        justifyContent: "center",
    },
    tabuleiro: {
        width: 300,
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
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
        backgroundColor: "#137FA8",
        padding: 10,
        borderRadius: 8,
    },
    btnReseta: {
        color: "white",
        backgroundColor: "#911515",
        padding: 10,
        borderRadius: 8,
        textAlign: "center",
    },
    selected: {
        backgroundColor: "#274E5D",
    },
    text2: {
        color: "white",
        margin: 5,
    },
    pontos: {
        flexDirection: "row",
        margin: 15,
        backgroundColor: "#000000",
        borderRadius: 100,
        padding: 10,
    },
});