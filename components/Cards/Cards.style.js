import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    white: '#ffffff',
    background: '#ffffff',
    cloud: '#bdc3c7',
    navy: '#2c3e50',
    green: '#27ae60',
    red: '#c0392b',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    scrollview: {
        flex: 1,
        paddingTop: 20
    },
    slider: {
        marginBottom: 0
    },
    sliderContainer: {
    }
});
