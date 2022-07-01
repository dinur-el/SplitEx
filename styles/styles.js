import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    expInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    body:{
        backgroundColor: 'white',
    },
    inputContainer: {

        width: '80%',
        
    },
    homeContainer: {
        paddingLeft: 15,
        paddingTop:15,
        paddingRight: 15,
        width: '100%',
        
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 1,

    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonOutline: {
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,  
    },
    iconStyle: {
        resizeMode: 'contain',
        width: '60%',
        height: '50%',
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    label:{
     //   marginBottom: 10,
        marginTop:10,
        color: 'Black',
        fontWeight: '900',
        fontSize: 20,  
       
    },
    listItem: {
        backgroundColor: 'white',
        marginTop: 15 ,
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,

    },
    FlatList: {
        width: '90%',  
    },
    addContactsBtn:{
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        borderRadius: 10,

    }
});