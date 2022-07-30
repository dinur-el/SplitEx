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
import DropDownPicker from 'react-native-dropdown-picker';

const CalculateExpenseScreen = ( props ) => {

    const { total, participants } = props.route.params
    console.log(participants)
    const [selected, setSelected] = useState(0)

    const [openTypes, setOpenTypes] = useState(false);
    const [typesValue, setTypesValue] = useState('0');
    const [typesItems, setTypesItems] = useState([
        { label: 'Equally', value: '0' },
        { label: 'Exact Amount', value: '1' },
        { label: 'Percentage', value: '2' }
    ]);

    // add a picker to select split equally, exact amount, percentage (optional)

    // if equally display textInput with divided amount
    // if amount or percentage empty textinput


    const renderItem = (  item  ) => {
        console.log("rendering......", typesValue)
        //return renderItemCreator({ item });
        switch(typesValue){

            case '0':

                const equal = total / participants.length

                return(
                    <TouchableOpacity>
                        <Text>{item.name}</Text>
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
                        <Text>{item.name}</Text>
                        <TextInput 
                            value={amount}
                        />
                    </TouchableOpacity>
                )

            case '2' :

                const percentage = 0.00    
                return(
                    <TouchableOpacity>
                        <Text>{item.name}</Text>
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
            {/* <Picker
                mode="dropdown"
                onValueChange={(value)=>{changeSelectedHandler(value)}}
            >
                {splitType.map((item, index) => {
                    return (
                        <Picker.Item label={item} value={index} key={index}/>
                    ); 
                })}
            </Picker> */}
            <DropDownPicker
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
                        // keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </View>
        </View>
    )

}

export default CalculateExpenseScreen 