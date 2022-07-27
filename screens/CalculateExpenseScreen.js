// VARIABLES
// render participants
// total expense
// state to maintain remainder - optional

// how to do
// display participants in a flatlist
// flatlist -> each needs to have a text field to add amount
// save button
// once set, go back to create expense

import React, { useState } from 'react'
import { View, SafeAreaView, Picker, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'

const CalculateExpenseScreen = ( props ) => {

    const { total, participants } = props.route.params

    const [selected, setSelected] = useState(0)

    // add a picker to select split equally, exact amount, percentage (optional)

    // if equally display textInput with divided amount
    // if amount or percentage empty textinput


    const renderItem = ( { item } ) => {

        //return renderItemCreator({ item });
        switch(selected){

            case '0':

                const equal = total / participants.length

                return(
                    <TouchableOpacity>
                        <Text>{item.item}</Text>
                        <TextInput 
                            editable={false}
                            value={equal}
                        />
                    </TouchableOpacity>
                )
             
            case '1' :

                const amount = 0.00

                return(
                    <TouchableOpacity>
                        <Text>{item.item}</Text>
                        <TextInput 
                            value={amount}
                        />
                    </TouchableOpacity>
                )

            case '2' :

                const percentage = 0.00    
                return(
                    <TouchableOpacity>
                        <Text>{item.item}</Text>
                        <TextInput 
                            value={percentage}
                        />
                        <Text>%</Text>
                    </TouchableOpacity>
                )    
        }

    }

    const renderItemCreator = ({ item }) => {

        

        switch(selected){

            case '0':

                const equal = total / participants.length

                return(
                    <TouchableOpacity>
                        <Text>{item.item}</Text>
                        <TextInput 
                            editable={false}
                            value={equal}
                        />
                    </TouchableOpacity>
                )
             
            case '1' :

                const amount = 0.00

                return(
                    <TouchableOpacity>
                        <Text>{item.item}</Text>
                        <TextInput 
                            value={amount}
                        />
                    </TouchableOpacity>
                )

            case '2' :

                const percentage = 0.00    
                return(
                    <TouchableOpacity>
                        <Text>{item.item}</Text>
                        <TextInput 
                            value={percentage}
                        />
                        <Text>%</Text>
                    </TouchableOpacity>
                )    
        }

    }

    const changeSelectedHandler = (value) => {
        console.log(`selected value: ${value}`);
        setSelected(value);
    }

    const splitType = [ 'Equally', 'Exact Amount', 'Percentage' ]

    return(
        <View>
            <Picker
                mode="dropdown"
                onValueChange={(value)=>{changeSelectedHandler(value)}}
            >
                {splitType.map((item, index) => {
                    return (
                        <Picker.Item label={item} value={index} key={index}/>
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
                </SafeAreaView>
            </View>
        </View>
    )

}

export default CalculateExpenseScreen