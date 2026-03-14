import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    function startGame(players) {
        navigation.navigate("Game", { players });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Quantos jogadores?</Text>
            <View style={styles.caixa1}>
                <TouchableOpacity style={styles.box1} onPress={() => startGame(1)}>
                    <Text style={styles.text}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box2} onPress={() => startGame(2)}>
                    <Text style={styles.text}>2</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.caixa1}>
                <TouchableOpacity style={styles.box3} onPress={() => startGame(3)}>
                    <Text style={styles.text}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box4} onPress={() => startGame(4)}>
                    <Text style={styles.text}>4</Text>
                </TouchableOpacity>
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
        flexDirection: 'row'
    },
    box1: {
        backgroundColor: '#274E5D',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    box2: {
        backgroundColor: '#137FA8',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    box3: {
        backgroundColor: '#5C0F0F',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    box4: {
        backgroundColor: '#BE2020',
        width: 100,
        height: 100,
        margin: 15,
        justifyContent: 'center'
    },
    text1: {
        fontSize: 30,
        color: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        color: 'white'
    }
});