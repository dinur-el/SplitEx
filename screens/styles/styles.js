import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainer: {
        width: '80%',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },

    button: {
        //backgroundColor: '#782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },

    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#782F9',
        borderWidth: 2,
        marginTop: 10
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },

    buttonTextOutline: {
        color: '#782F9',
        fontWeight: '700',
        fontSize: 16
    }
});