import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    function startGame(players) {
        navigation.navigate("Tutorial", { players });
    }
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text1}>WarKingdom</Text>
                <Text style={styles.text3}>Max Paolo Turco Klock - Programação</Text>
                <Text style={styles.text3}>Marco Antonio Slompo - Imagens/Cores</Text>
                <Text style={styles.text3}>Matheus Henrique Muraro De Souza - Historia/Ideias</Text>
                <Text style={styles.text3}>FRANSSIANO FERREIRA SCHNEIDERS - Historia/Ideias</Text>
                <Text style={styles.text3}>KAUE GABRIEL SCHVABE SLOMPO - Historia/Ideias</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text2}>Quantos jogadores?</Text>
                <View style={styles.caixa1}>
                    <TouchableOpacity style={styles.box2} onPress={() => startGame(2)}>
                        <Text style={styles.text}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box3} onPress={() => startGame(3)}>
                        <Text style={styles.text}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box4} onPress={() => startGame(4)}>
                        <Text style={styles.text}>4</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262B2D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    caixa1: {
        flexDirection: 'row',
        marginBottom: 100,
    },
    box2: {
        backgroundColor: '#4A6C8A',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    box3: {
        backgroundColor: '#556B2F',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    box4: {
        backgroundColor: '#8C3B2F',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    text1: {
        fontSize: 50,
        color: 'white',
        borderColor: "#4A6C8A",
        borderWidth: 4,
        padding: 8,
        borderRadius: 20,
        marginTop: 40,
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        color: 'white'
    },
    text2: {
        fontSize: 30,
        color: 'white',
    },
    text3: {
        fontSize: 15,
        color: 'white',
        textAlign: "center",
        padding: 5,
        marginTop: 10,
    },
});