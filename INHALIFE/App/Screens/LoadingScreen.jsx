import { View, Text, ActivityIndicator } from "react-native";


function LoadingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, marginVertical: '2%' }}>INICIANDO INHALIFE...</Text>
            <ActivityIndicator size="large" color="#00AAE4" />
        </View>
    );
}

export default LoadingScreen;