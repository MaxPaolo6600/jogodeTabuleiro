import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function Cell({ cell, onPress }) {
    function renderPiece(size, color) {
        let tamanho = 35;
        if (size==="medium") tamanho = 65;
        if (size==="large") tamanho = 80;
        return (
            <View style={{
                width: tamanho,
                height: tamanho,
                borderWidth: 2,
                borderColor: color,
                position: 'absolute'
            }} />
        )
    }
    return (
        <TouchableOpacity style={styles.cell} onPress={onPress}>
            {cell.small && renderPiece("small", cell.small)}
            {cell.medium && renderPiece("medium", cell.medium)}
            {cell.large && renderPiece("large", cell.large)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cell: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: "#137FA8",
        alignItems: 'center',
        justifyContent: 'center'
    }
})