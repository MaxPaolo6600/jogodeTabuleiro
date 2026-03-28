import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
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
        }))
    );
    const [turn, setTurn] = useState(0);
    const [pieceSize, setPieceSize] = useState("small");

    const [peca, setPeca] = useState(
        Array.from({ length: players }, () => ({
            small: 3,
            medium: 3,
            large: 3
        }))
    );

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

        if (novasPecas[turn][pieceSize] <= 0) {
            Alert.alert("Sem peças!", "Você não tem mais peças desse tamanho.");
            return;
        }
        if (novoQuadro[index][pieceSize]) return;
        novoQuadro[index] = {
            ...novoQuadro[index],
            [pieceSize]: playerColors[turn]
        };
        novasPecas[turn][pieceSize] -= 1;
        setTabuleiro(novoQuadro);
        setPeca(novasPecas);

        const winner = checkWin(novoQuadro);
        if (winner) {
            Alert.alert(`Jogador ${turn + 1} venceu!`);
            return;
        }
        setTurn((turn + 1) % players);
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
                    style={[styles.sizeBtn, pieceSize === "small" && styles.selected]}
                    onPress={() => setPieceSize("small")}
                >
                    Pequena
                </Text>
                <Text
                    style={[styles.sizeBtn, pieceSize === "medium" && styles.selected]}
                    onPress={() => setPieceSize("medium")}
                >
                    Média
                </Text>
                <Text
                    style={[styles.sizeBtn, pieceSize === "large" && styles.selected]}
                    onPress={() => setPieceSize("large")}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262B2D",
        alignItems: "center",
        justifyContent: "center"
    },
    tabuleiro: {
        width: 300,
        flexDirection: "row",
        flexWrap: "wrap"
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
        alignItems: "center"
    },
    label: {
        color: "white",
        fontSize: 18
    },
    sizeBtn: {
        color: "white",
        backgroundColor: "#137FA8",
        padding: 10,
        borderRadius: 8
    },
    selected: {
        backgroundColor: "#274E5D"
    },
    text2: {
        color: "white",
        margin: 5,
    }
});