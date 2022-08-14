import React, { useState } from 'react'
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/native';
import { styles } from '../styles/styles';

const CalculateExpenseScreen = ( props ) => {

    const { total, participants } = props.route.params

    const [ balance, setBalance ] = useState(total)

    const popAction = StackActions.pop(1);

    // type of payment 
    //const [selected, setSelected] = useState(0)

    // to store a single participant contribution value
    const [ value, setValue ] = useState([]);


    const [ txtInput, setTxtinput ] = useState()

    // this state has to hold participant id, name and individual value
    const [participantExpenseList, setParticipantExpenseList] = useState([]);

    const equal = total / participants.length


    // for dropdown picker

    const [openTypes, setOpenTypes] = useState(false);

    const [typesValue, setTypesValue] = useState('0');

    const [typesItems, setTypesItems] = useState([
    { label: 'Equally', value: '0' },
    { label: 'Exact Amount', value: '1' },
    { label: 'Percentage', value: '2' }
    ]);


    // // exp

    // useEffect(() => {
        
    //     participants.forEach((paricipant) => {
    //         setValue( value => [...value, { 
    //             id: paricipant.id,
    //             name: paricipant.item,
    //             share: '0.0' }])
    //     })



    // }, []);

    // // exp end


    const onPressHandler = (item) => {

        const amount = txtInput

        const balance = balance - amount

        setBalance(balance);
        
        const id = item.userId

        const result = participantExpenseList.filter( (item) => item.userId === id)

        console.log(result);

        if(result.length === 0){

            setParticipantExpenseList(participantExpenseList => [...participantExpenseList, {
                userId: item.userId,
                name: item.name,
                share: amount
            }])

        }else{
            console.log('share exceeds');
        }

        console.log(`participantList....`)
        

    }

    console.log(participantExpenseList)


    const sharedExpenseHandler = (participantsExpenseList) => {
        //pass the participantsExpenseList as a prop to createExpenseScreen
        props.onSaveExpenseItem(participantExpenseList)
        props.navigation.dispatch(popAction);
    }

    // const onChangeValueTextHandler = async ( amount, item ) => {

    //     let arr = [ ...value ]
    //     // console.log(`value......`);
    //     // console.log(value);

    //     arr = await Promise.all(arr.map((participant) => {

    //         let amt = participant.share;

    //         //console.log(`participant: ${participant}`);

    //         if(participant.id === item.userId) {

    //             amt = amount
                
    //         }

    //         return {
    //             'id': participant.id,
    //             'name': participant.name,
    //             'share': amt,
    //         }
    
    //     }))

    //     setValue(arr);

    //     // console.log(`after value change-----`);
    //     // console.log(value);

    // }

    //console.log(participantExpenseList);

    const renderItem = ( { item } ) => {

        switch(typesValue){

            case '1' :

                return(
                    <View style={styles.listItemContainer}>
                        <View styles={styles.listDetailsContainer}>
                            <Text>{item.name}</Text>
                            <TextInput
                                onChangeText ={(value) => {
                                    setTxtinput(value);
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                            <TouchableOpacity 
                                onPress={() => onPressHandler(item)}
                            >
                                <AntDesign name="check" color="black" size={20} />
                            </TouchableOpacity>    
                    </View>
                )

            case '2' :
 
                return(
                    <View style={styles.listItemContainer}>
                        <View styles={styles.listDetailsContainer}>
                            <Text>{item.name}</Text>
                            <TextInput
                                onChangeText={(value) => {
                                    setTxtinput(value);
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                            <TouchableOpacity 
                                onPress={() => onPressHandler(item)}
                            >
                                <AntDesign name="check" color="black" size={20} />
                            </TouchableOpacity>    
                    </View>
                )   
                
            default :     

                return(
                    <View style={styles.listItemContainer}>
                        <View styles={styles.listDetailsContainer}>
                            <Text>{item.name}</Text>
                            <TextInput
                                onChangeText={(equal) => {
                                    setTxtinput(equal);
                                }}
                                value={equal}
                                keyboardType="numeric"
                            />
                        </View>
                            <TouchableOpacity 
                                onPress={() => onPressHandler(item)}
                            >
                                <AntDesign name="check" color="black" size={20} />
                            </TouchableOpacity>    
                    </View>
                ) 
        }

    }

    // picker change handler
    // const changeSelectedHandler = (value) => {
    //     setSelected(value);
    // }

    // const splitType = [ 'Equally', 'Exact Amount', 'Percentage' ]

    return(
        <View style={styles.homeContainer}>
            <Text style={styles.label}>{`Remaining: ${balance}`}</Text>
            <DropDownPicker
                style={{ height: 40, marginVertical: 10 }}
                open={openTypes}
                value={typesValue}
                items={typesItems}
                setOpen={setOpenTypes}
                setValue={setTypesValue}
                setItems={setTypesItems}
                placeholder="Equally"
            />
            <View>
                <SafeAreaView>
                    <FlatList
                        data={participants}
                        renderItem={renderItem}
                        keyExtractor={item => item.userId}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{sharedExpenseHandler}}
                        >
                            <Text style={styles.buttonText}>S A V E</Text>
                        </TouchableOpacity>
                   </View>
                </SafeAreaView>
            </View>
        </View>
    )

}

export default CalculateExpenseScreen