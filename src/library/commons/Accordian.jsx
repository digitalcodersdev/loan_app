import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import colors from 'resources/colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
/*
 * This class is used to print common skills that we select during creating a job
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
      selectedSkills: props.selectedSkills || [],
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const {selectedSkills} = this.state;
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          <View style={styles.skillText}>
            {/* {selectedSkills.length > 0 && (
              <Text style={styles.skillCount}>
                {selectedSkills.length} Skill
              </Text>
            )} */}
            <Icon
              name={
                this.state.expanded
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color={colors.DARKGRAY}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={{paddingHorizontal: 10}}>
            <FlatList
              scrollEnabled={false}
              data={this.props.data}
              numColumns={1}
              renderItem={({item, index}) =>
                item.type === 'sub-category' ? (
                  <InnerAccordion
                    skills={item.skill}
                    title={item.title}
                    selectedSkills={selectedSkills}
                    onSkillSelect={this.onSkillSelect}
                  />
                ) : (
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.childRow,
                        styles.button,
                        selectedSkills.includes(item.id)
                          ? styles.btnActive
                          : styles.btnInActive,
                      ]}
                      onPress={() => this.onSkillSelect(item)}>
                      <Text style={[styles.font, styles.itemInActive]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            />
          </View>
        )}
      </View>
    );
  }

  onSkillSelect = item => {
    let {selectedSkills} = this.state;
    if (selectedSkills.includes(item.id)) {
      selectedSkills = selectedSkills.filter(_item => _item != item.id);
    } else {
      selectedSkills.push(item.d);
    }
    this.setState({selectedSkills}, () => {
      this.props.onSkillChange && this.props.onSkillChange(item);
    });
  };

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}
const InnerAccordion = ({title, skills, selectedSkills, onSkillSelect}) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpand(!expand);
  };
  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <Text style={[styles.title_inner]}>{title}</Text>
        <View style={styles.skillText}>
          <Icon
            name={expand ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={30}
            color={colors.DARKGRAY}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expand && (
        <View>
          <FlatList
            scrollEnabled={false}
            data={skills}
            numColumns={1}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  style={[
                    styles.childRow,
                    styles.button,
                    selectedSkills.includes(item.id)
                      ? styles.btnActive
                      : styles.btnInActive,
                  ]}
                  onPress={() => onSkillSelect(item)}>
                  <Text style={[styles.font, styles.itemInActive]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillText: {flexDirection: 'row', alignItems: 'center'},
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    color: colors.DARKGRAY,
    fontFamily: R.fonts.Bold,
  },
  title_inner: {
    fontSize: 12,
    color: colors.DARKGRAY,
    fontFamily: R.fonts.Bold,
  },
  itemActive: {
    fontSize: 12,
    color: colors.GREEN,
  },
  skillCount: {
    fontSize: 12,
    color: colors.GREEN,
    fontFamily: R.fonts.Bold,
  },
  itemInActive: {
    fontSize: 12,
    color: colors.DARKGRAY,
  },
  btnActive: {
    borderColor: colors.GREEN,
  },
  btnInActive: {
    borderColor: colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentHr: {
    height: 1,
    color: colors.WHITE,
    width: '100%',
  },
  childHr: {
    height: 1,
    backgroundColor: colors.LIGHTGRAY,
    width: '100%',
  },
  colorActive: {
    borderColor: colors.GREEN,
  },
  colorInActive: {
    borderColor: colors.DARKGRAY,
  },
});
