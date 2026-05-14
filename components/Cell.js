import React, { useMemo } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function Cell({ cell, onPress }) {
    const tamanhos = {
        small: 15,
        medium: 20,
        large: 30,
    };

    function gerarPosicao(maxDistancia) {
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 10 + Math.random() * maxDistancia;
        return {
            x: Math.cos(angulo) * distancia,
            y: Math.sin(angulo) * distancia,
        };
    }
    function distancia(p1, p2) {
        return Math.sqrt(
            Math.pow(p1.x - p2.x, 2) +
            Math.pow(p1.y - p2.y, 2)
        );
    }
    function gerarSemSobreposicao() {
        const limites = {
            small: 20,
            medium: 28,
            large: 30,
        };

        const positions = {};
        const ordem = ["small", "medium", "large"];// pequena primeiro
        ordem.forEach((size) => {
            let encontrou = false;
            for (let tentativa = 0; tentativa < 500; tentativa++) {
                const novaPos = gerarPosicao(limites[size]);
                let colisao = false;
                for (const outra of Object.keys(positions)) {
                    const raioAtual = tamanhos[size] / 2;
                    const raioOutra = tamanhos[outra] / 2;

                    const distanciaMinima =
                        raioAtual +
                        raioOutra +
                        18;
                    const dist = distancia(
                        novaPos,
                        positions[outra]
                    );
                    if (dist < distanciaMinima) {
                        colisao = true;
                        break;
                    }
                }
                if (!colisao) {
                    positions[size] = novaPos;
                    encontrou = true;
                    break;
                }
            }

            if (!encontrou) {// se não encontrou, coloca afastado manualmente
                if (size === "small") {
                    positions[size] = { x: -20, y: -20 };
                }
                if (size === "medium") {
                    positions[size] = { x: 20, y: -20 };
                }
                if (size === "large") {
                    positions[size] = { x: 0, y: 22 };
                }
            }
        });
        return positions;
    }

    const positions = useMemo(
        () => gerarSemSobreposicao(),
        []
    );

    function renderPiece(size, color) {
        const tamanho = tamanhos[size];
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
            {cell.large && renderPiece("large", cell.large)}
            {cell.medium && renderPiece("medium", cell.medium)}
            {cell.small && renderPiece("small", cell.small)}
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