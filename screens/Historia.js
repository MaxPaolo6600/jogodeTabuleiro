import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Historia({ navigation, route }) {
    const { players } = route.params;
    function goTutorial() {
        navigation.navigate("Tutorial", { players });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
                Em um reino mágico, quatro aventureiros foram escolhidos para participar de um desafio lendário: encontrar o Cristal Supremo, um artefato antigo que concede poder e glória a quem o possuir.
            </Text>
            <Text style={styles.text1}>
                Os jogadores são rivais, mas compartilham o mesmo objetivo. Cada um segue por caminhos diferentes — florestas encantadas, cavernas escuras, montanhas perigosas e ruínas esquecidas — enfrentando desafios e superando obstáculos.
            </Text>
            <Text style={styles.text1}>
                Ao longo da jornada, eles podem se cruzar, competir por recursos e até atrapalhar uns aos outros. Só um conseguirá chegar primeiro ao templo final, onde o Cristal Supremo está guardado.
            </Text>
            <Text style={styles.text1}>
                No fim, apenas o jogador mais habilidoso, estratégico (e um pouco sortudo) conseguirá vencer — tornando-se o único campeão.
            </Text>
            <TouchableOpacity style={styles.button} onPress={goTutorial}>
                <Text style={styles.text}>Voltar para Tutorial</Text>
            </TouchableOpacity>
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
    button: {
        color: "white",
        backgroundColor: "#137FA8",
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
        width: 200,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
    text1: {
        color: "white",
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        textAlign: "center",
    },
});