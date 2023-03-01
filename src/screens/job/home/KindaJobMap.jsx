import React, {useRef, useState, useEffect} from 'react';
import {View, Platform, StyleSheet, Text, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDLIzgSWbrnbcBgiDiOvlsrA8L4klGYzAk';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {dark} from '../../../constants/mapTheme';
/*
 * This function is used to create Map for Home Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const mapStyle = [...dark];
const KindaJobMap = () => {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeData, setRouteData] = useState(null);

  let {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [mapRegion, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [route, setRoute] = useState(null);
  useEffect(() => {
    locateCurrentLocation();
  }, []);
  const locateCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position);
        const coords = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        mapRef.current?.animateToRegion(coords, 10);
        setCurrentLocation(coords);
        setRegion(coords);
        //   setRoute({
        //     source: {latitude: 26.782286, longitude: 79.0181},
        //     destination: {
        //       latitude: parseFloat(position.coords.latitude),
        //       longitude: parseFloat(position.coords.longitude),
        //     },
        //   });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View style={styles.container}>
      {routeData && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            backgroundColor: '#fff',
            paddingVertical: 10,
            paddingHorizontal: 10,
            top: 35,
            alignItems: 'center',
            left: 100,
            borderRadius: 20,
          }}>
          <Text style={{color: '#000'}}>
            {parseFloat(routeData.duration).toFixed(2)} min away from your
            location, ({routeData.distance})
          </Text>
        </View>
      )}
      {mapRegion && (
        <MapView
          ref={mapRef}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
          style={styles.mapStyle}
          onRegionChange={region => setRegion(region)}
          customMapStyle={mapStyle}
          userInterfaceStyle={'dark'}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          userLocationPriority={'high'}
          showsCompass={false}
          showsBuildings={false}
          userLocationUpdateInterval={1000}
          // minZoomLevel={18}
          // maxZoomLevel={20}
          zoomEnabled={true}
          zoomControlEnabled={false}
          initialRegion={mapRegion}>
          {/* {currentLocation && (
          <Marker
            draggable={false}
            coordinate={currentLocation}
            description={'Searching for opportunities 00:10'}
            title={'Vimal Kumar'}>
            <View style={{borderColor: '#fff', overflow: 'visible'}}>
              <Icon name="circle" color="#4185f4" size={25} />
            </View>
          </Marker>
        )} */}
          {route && (
            <Marker
              coordinate={route.source}
              //   description={'Searching for opportunities 00:10'}
              title={'Service Provider'}>
              <View>
                <Icon name="circle" color="#E3AB1A" size={25} />
              </View>
            </Marker>
          )}
          {route && (
            <MapViewDirections
              origin={route.source}
              destination={route.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="green"
              onReady={result => {
                //   console.log(`Distance: ${result.distance} km`);
                //   console.log(`Duration: ${result.duration} min.`);
                setRouteData({
                  distance: `${result.distance} km`,
                  duration: `${result.duration} min`,
                });
              }}
              onError={errorMessage => {
                console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
      )}
    </View>
  );
};
export default KindaJobMap;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1318',
  },
  mapStyle: {
    flex: 1,
  },
  tooltip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    position: 'absolute',
  },
});
