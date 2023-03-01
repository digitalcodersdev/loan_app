import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import R from 'resources/R';
import styles from './styles'
/*
 * This function is used to create About Us Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const WorkWithUs = () => {
  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.text1}>About Us</Text>
          <Text style={styles.text2}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Text>
          <Text style={styles.text2}>
            Working with kindajobs is an effective and simple way to make lots
            money with doing things that you are good at.
          </Text>
          <Text style={styles.text2}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Text>
          <Text style={styles.text2}>
            Working with kindajobs is an effective and simple way to make lots
            money with doing things that you are good at.
          </Text>
          <Text style={styles.text2}>
            Working with kindajobs is an effective and simple way to make lots
            money with doing things that you are good at.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
export default WorkWithUs;