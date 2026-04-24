import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function Cell({ cell, onPress }) {
    function renderPiece(size, color) {
        let tamanho = 25;
        if (size==="medium") tamanho = 57;
        if (size==="large") tamanho = 85;
        return (
            <View style={{
                width: tamanho,
                height: tamanho,
                borderWidth: 5,
                borderColor: color,
                position: 'absolute',
                borderRadius: 100,
            }} />
        )
    }
    return (
        <TouchableOpacity style={styles.cell} onPress={onPress}>
            <TouchableOpacity style={styles.cell1} onPress={onPress}>
                <TouchableOpacity style={styles.cell2} onPress={onPress}>
                    {cell.small && renderPiece("small", cell.small)}
                </TouchableOpacity>
                    {cell.medium && renderPiece("medium", cell.medium)}
            </TouchableOpacity>
            {cell.large && renderPiece("large", cell.large)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cell: {
        width: 100,
        height: 100,
        backgroundColor: "#843E3D",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        margin: 5,
    },
    cell1: {
        width: 67,
        height: 67,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    cell2: {
        width: 35,
        height: 35,
        backgroundColor: "#843E3D",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
})