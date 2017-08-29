import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './Cards.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export const slideHeight = viewportHeight * 0.8;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingTop: 18, // needed for shadow
    },
    imageContainer: {
        height: slideHeight-260,
        backgroundColor: 'transparent',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
    },
    imageContainerEven: {
        backgroundColor: 'transparent',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
        height: slideHeight-260,
        width: slideWidth,
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    // radiusMask: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     height: entryBorderRadius,
    //     backgroundColor: colors.red
    // },
    // radiusMaskEven: {
    //     backgroundColor: colors.blue
    // },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 15 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: colors.cloud,
        shadowOffset:{  width: 0,  height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    textContainerEven: {
        backgroundColor: colors.navy
    },
    title: {
        textAlign: 'center',
        color: colors.navy,
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginBottom: 6,
        // textShadowColor: 'black',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 4,
    },
    titleEven:{
        color: colors.white,
    },
    subtitle: {
        color: colors.navy,
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'normal',
        // textShadowColor: 'black',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 1,
    },
    subtitleEven:{
        color: colors.white,
    },
    subsubtitle: {
        fontSize: 14,
    },
    subtext: {
        color: colors.black,
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    subsubtext: {
        fontSize: 14,
    },
    complete: {
        color: colors.green,
    },
    incomplete: {
        color: colors.red,
    },
});
