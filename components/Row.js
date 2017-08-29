import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform} from 'react-native';

function Row({title, urgent, warning}) {
  return (
    <TouchableHighlight
      style={[urgent ? styles.urgent: {}, warning ? styles.warning: {}]}
    >
      <View style={styles.row}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  urgent: PropTypes.bool.isRequired,
  warning: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  urgent:{
    backgroundColor:'#c0392b',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    shadowOffset:{  width: 0,  height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  warning:{
    backgroundColor:'#f9bd49',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    shadowOffset:{  width: 0,  height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowRadius: 4,
  }
});

export default Row;
