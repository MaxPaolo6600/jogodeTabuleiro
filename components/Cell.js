import React, { useMemo } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const tamanhos = {
    small: 17,
    medium: 23,
    large: 32,
};
const posicoes = [//posicoes "aleatorias"
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: 0, y: 20 },
];
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
    function renderPeca(size, color) {//versao simplificada, testar para ver se funciona
        const tamanho = tamanhos[size];//se nao funcionar ta no GitHub a versao antiga
        const pos = positions[size];
        return (
            <View
                style={{
                    width: tamanho,
                    height: tamanho,
                    borderWidth: 5,
                    backgroundColor: color,
                    borderRadius: 100,
                    position: "absolute",
                    left: 50 - tamanho / 2 + pos.x,
                    top: 50 - tamanho / 2 + pos.y,
                }}
            />
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