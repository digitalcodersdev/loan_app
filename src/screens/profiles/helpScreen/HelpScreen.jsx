import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import SearchInput from 'library/commons/SearchInput';
import strings from '../../../strings';
import styles from './styles';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import R from 'resources/R';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserApi from '../../../datalib/services/user.api';
/*
 * This function is used to create Help SCreen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const HelpScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [queries, setQuery] = useState([]);
  const [ansId, setAnsId] = useState();
  useEffect(() => {
    getFaqs();
  }, []);
  const getFaqs = async () => {
    const res = await new UserApi().getFaq();
    if (res) {
      setQuery(res);
    }
  };
  const changebleArr = data.length ? data : queries;
  const handleFilter = text => {
    setSearch(text);
    if (search.length) {
      const data = queries.filter(item => {
        if (item.question.toUpperCase().includes(text.toUpperCase())) {
          return item;
        }
      });
      setData(data);
    }
  };
  return (
    <ScreenWrapper>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.helpText}>{strings.help}</Text>
        <View style={styles.container}>
          <Text style={styles.supportText}>{'Contact support:'}</Text>
          <Text style={styles.contactText}>{' 123-123-1234'}</Text>
        </View>

        <Text style={styles.faqText}>
          {'Check the FAQ to see if your problem can be resolved'}
        </Text>
        <View style={styles.searchContainer}>
          {/* <SearchInput
            setSearch={setSearch}
            searchArray={changebleArr}
            setData={setData}
            search={search}
            setSearchListBool={setSearchListBool}
          /> */}
          <View style={styles.searchWrapper}>
            <TextInput
              value={search || null}
              onChangeText={text => handleFilter(text)}
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={styles.input}
            />
            <Icon
              style={{
                width: 40,
                height: '100%',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              name={'search'}
              size={22}
              color={'#000'}
            />
          </View>
        </View>
        <View style={styles.secondary}>
          {changebleArr.map((item, index) => (
            <>
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  if (ansId === item.id) {
                    setAnsId(null);
                  } else {
                    setAnsId(item.id);
                  }
                }}>
                <Text style={styles.mapText}>{item.question}</Text>
              </TouchableOpacity>
              {ansId === item.id ? <Answers ans={item.answer} /> : null}
            </>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
export default HelpScreen;

const Answers = ({ans}) => {
  return (
    <>
      <Text style={styles.ans}>{ans.answer}</Text>
    </>
  );
};
