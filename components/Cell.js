import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function Cell({ cell, onPress }) {
    function renderPiece(size, color) {
        let tamanho = 20;
        if (size==="medium") tamanho = 35;
        if (size==="large") tamanho = 50;
        return (
            <View style={{
                width: tamanho,
                height: tamanho,
                borderRadius: tamanho / 2,
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