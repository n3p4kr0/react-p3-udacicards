import React from 'react'
import { View, TextInput, Text } from 'react-native'

const ValidatedTextInput = props => (
    <View>
        <TextInput />
            { props.error && <Text>{props.error}</Text>}
    </View>
)

export default ValidatedTextInput