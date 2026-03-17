import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Cell from "../components/Cell";

const playerColors = [
    "#274E5D",
    "#137FA8",
    "#5C0F0F",
    "#BE2020"
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

    function checkWin(tabuleiro) {
        const tamanhos = ["small", "medium", "large"];
        for (let i = 0; i < 9; i++) {
            const cell = tabuleiro[i];
            if (
                cell.small &&
                cell.small === cell.medium &&
                cell.medium === cell.large
            ) {
                return cell.small;}
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
        if (!novoQuadro[index][pieceSize]) {
            novoQuadro[index] = {
                ...novoQuadro[index],
                [pieceSize]: playerColors[turn]
            };
            setTabuleiro(novoQuadro);
            const winner = checkWin(novoQuadro);
            if (winner) {
                Alert.alert(`Jogador ${turn + 1} venceu!`);
                return;
            }
            setTurn((turn + 1) % players);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.turn, { backgroundColor: playerColors[turn] }]}>
                vez de jogador {turn + 1}
            </Text>
            <View style={styles.sizeSelector}>
                <Text style={styles.label}>Peça:</Text>
                <Text
                    style={[
                        styles.sizeBtn,
                        pieceSize === "small" && styles.selected
                    ]}
                    onPress={() => setPieceSize("small")}
                >
                    Pequena
                </Text>
                <Text
                    style={[
                        styles.sizeBtn,
                        pieceSize === "medium" && styles.selected
                    ]}
                    onPress={() => setPieceSize("medium")}
                >
                    Média
                </Text>
                <Text
                    style={[
                        styles.sizeBtn,
                        pieceSize === "large" && styles.selected
                    ]}
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
    }
});