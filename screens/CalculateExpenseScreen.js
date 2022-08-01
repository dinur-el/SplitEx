import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Picker, Text, TextInput, TouchableOpacity, FlatList, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/native';
import { styles } from '../styles/styles';
import { async } from '@firebase/util';

const CalculateExpenseScreen = ( props ) => {

    const { total, participants } = props.route.params

    const [ balance, setBalance ] = useState(total)

    const popAction = StackActions.pop(1);

    // type of payment 
    const [selected, setSelected] = useState(0)

    // to store a single participant contribution value
    const [ value, setValue ] = useState([]);


    const [ txtInput, setTxtinput ] = useState()

    // this state has to hold participant id, name and individual value
    const [participantExpenseList, setParticipantExpenseList] = useState([]);

    const equal = total / participants.length

    
    // exp

    useEffect(() => {
        
        participants.forEach((paricipant) => {
            setValue( value => [...value, { 
                id: paricipant.id,
                name: paricipant.item,
                share: '0.0' }])
        })



    }, []);

    // exp end


    const onPressHandler = (item) => {

        const amount = txtInput

        const balance = balance - amount

        setBalance(balance);
        
        const id = item.id

        const result = participantExpenseList.filter( (item) => item.id === id)

        console.log(result);

        if(result.length === 0){

            setParticipantExpenseList(participantExpenseList => [...participantExpenseList, {
                id: item.id,
                name: item.item,
                amount: amount
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

    const onChangeValueTextHandler = async ( amount, item ) => {

        let arr = [ ...value ]
        // console.log(`value......`);
        // console.log(value);

        arr = await Promise.all(arr.map((participant) => {

            let amt = participant.share;

            //console.log(`participant: ${participant}`);

            if(participant.id === item.id) {

                amt = amount
                
            }

            return {
                'id': participant.id,
                'name': participant.name,
                'share': amt,
            }
    
        }))

        setValue(arr);

        // console.log(`after value change-----`);
        // console.log(value);

    }

    //console.log(participantExpenseList);

    const renderItem = ( { item } ) => {

        switch(selected){

            case '1' :

                return(
                    <View style={styles.listItemContainer}>
                        <View styles={styles.listDetailsContainer}>
                            <Text>{item.item}</Text>
                            <TextInput
                                onChangeText ={(value) => {
                                    // console.log(`value: ${value}`)
                                    // console.log(`item: ${item}`)
                                    // onChangeValueTextHandler( value, item )
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
                            <Text>{item.item}</Text>
                            <TextInput
                                onChangeText={(value) => {
                                    // console.log(`value: ${value}`)
                                    // console.log(`item: ${item}`)
                                    // onChangeValueTextHandler( value, item )
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
                            <Text>{item.item}</Text>
                            <TextInput
                                onChangeText={(equal) => {
                                    // console.log(`value: ${equal}`)
                                    // console.log(`item: ${item}`)
                                    // onChangeValueTextHandler( equal, item )
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
    const changeSelectedHandler = (value) => {
        setSelected(value);
    }

    const splitType = [ 'Equally', 'Exact Amount', 'Percentage' ]

    return(
        <View style={styles.homeContainer}>
            <Text style={styles.label}>{`Remaining: ${balance}`}</Text>
            <Picker style={{ height: 40, marginVertical: 10 }}
                mode="dropdown"
                onValueChange={(value)=>{changeSelectedHandler(value)}}
            >
                {splitType.map((item, index) => {
                    return (
                        <Picker.Item 
                            label={item} 
                            value={index} 
                            key={index}
                            style={{ fontSize: 20, paddingBottom: 10 }}
                        />
                    ); 
                })}
            </Picker>
            <View>
                <SafeAreaView>
                    <FlatList
                        data={participants}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
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