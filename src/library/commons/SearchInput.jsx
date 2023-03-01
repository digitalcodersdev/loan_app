import React from 'react';
import {View, TextInput} from 'react-native';
import {AntDesign} from '../../assets';
import R from 'resources/R';
/*
 * This function is used to create our Search Box for help screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const SearchInput = ({
  setSearch,
  searchArray,
  setData,
  search,
  setSearchListBool,
}) => {
  function makeRemoteRequestSearch(text) {
    setSearchListBool(true);
    setSearch(text);
    const newData = searchArray.filter(item => {
      const itemData = `${item.toUpperCase()} ${item.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        height: 45,
        elevation: 2,
        backgroundColor: R.colors.backgroundColor,
        borderRadius: 4,
        marginTop: 12,
      }}>
      <TextInput
        onSubmitEditing={() => setSearchListBool(false)}
        onFocus={() => {
          setSearchListBool(true);
        }}
        onBlur={() => setSearchListBool(false)}
        value={search || null}
        onChangeText={text => makeRemoteRequestSearch(text)}
        placeholder="Search"
        placeholderTextColor={'#000'}
        style={{
          width: '85%',
          color: R.colors.PRIMARI_DARK,
          fontFamily: R.fonts.Medium,
          height: '100%',
          fontSize: 13,
          padding: 0,
          marginLeft: 6,
        }}
      />
      <AntDesign
        style={{
          width: 40,
          height: '100%',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
        name={'search1'}
        size={22}
        color={'#000'}
      />
    </View>
  );
};

export default SearchInput;
