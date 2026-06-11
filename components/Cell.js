import React, { useMemo } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";

const tamanhos = {
    small: 23,
    medium: 35,
    large: 50,
};
const posicoes = [//posicoes "aleatorias"
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: 0, y: 20 },
];
const imagens = {
    "#8C3B2F": require("../assets/pieces/red.png"),
    "#556B2F": require("../assets/pieces/green.png"),
    "#4A6C8A": require("../assets/pieces/blue.png"),
    "#B08A3E": require("../assets/pieces/yellow.png"),
};
export default function Cell({ cell, onPress }) {
    const positions = useMemo(() => {
        const embaralhadas = [...posicoes].sort(
            () => Math.random() - 0.5
        );
        return {
            small: embaralhadas[0],
            medium: embaralhadas[1],
            large: embaralhadas[2],
        };
    }, []);
    function renderPeca(size, color) {
        const tamanho = tamanhos[size];
        const pos = positions[size];
        const left = 50 - tamanho / 2 + pos.x;
        const top = 50 - tamanho / 2 + pos.y;
        const offsets = [ // deslocamentos para formar o contorno
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
        ];
        return (
            <>
                {offsets.map(([dx, dy], index) => (
                    <Image
                        key={index}
                        source={imagens[color]}
                        tintColor="black"
                        style={{
                            width: tamanho,
                            height: tamanho,
                            position: "absolute",
                            left: left + dx,
                            top: top + dy,
                            resizeMode: "contain",
                        }}
                    />
                ))}
                <Image
                    source={imagens[color]}
                    style={{
                        width: tamanho,
                        height: tamanho,
                        position: "absolute",
                        left, top,
                        resizeMode: "contain",
                    }}
                />
            </>
        );
    }
    return (
        <TouchableOpacity
            style={styles.cell}
            onPress={onPress}
        >
            {cell.large && renderPeca("large", cell.large)}
            {cell.medium && renderPeca("medium", cell.medium)}
            {cell.small && renderPeca("small", cell.small)}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    cell: {
        width: 100,
        height: 100,
        margin: 5,
        position: "relative",
        overflow: "hidden",
    },
});