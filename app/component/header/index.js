import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker,
    FlatList,
    StatusBar,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';

import styles from './styles'
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

export default function Header(props) {
    const {
        title,
        style,
        onPressLeft,
        onPressRight,
        renderLeft,
        renderRight
    } = props;

    return (
        <LinearGradient colors={['#2B6EF2', '#8DB3FF']} style={[styles.contain, style]} >
            <SafeAreaView
                style={{ flexDirection: 'row', justifyContent: 'space-between', margin: '3%' }}>
                <TouchableOpacity 
                style={{paddingRight:10,paddingBottom:10}}
                onPress={onPressLeft}> 
                {renderLeft()}</TouchableOpacity>
                <Text style={{
                    color: 'white', fontSize: 16, fontFamily: 'Roboto',
                    textAlign: 'center', justifyContent: 'center'
                }}> {title}</Text>
                <TouchableOpacity 
                 style={{paddingLeft:10,paddingBottom:10}}
                onPress={onPressRight}> 
                {renderRight()}</TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}



