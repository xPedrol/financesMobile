import {StatusBar, StyleSheet, View} from "react-native";

export default function Layout({children}) {
    const initialPadding = StatusBar.currentHeight || 22;
    const styles = StyleSheet.create({
        body: {
            display: 'flex',
            flex: 1,
            opacity: 1,
            paddingTop: initialPadding,
        },
        container: {
            paddingLeft: 10,
            paddingRight: 10,
        },
        bottomBar: {
            height: 70,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        barButton: {
            borderRadius: 15,
        }
    });
    return (
        <View style={styles.body}>
            <View style={styles.container}>
                {children}
            </View>
        </View>
    );
}