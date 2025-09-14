import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DemoInfo = ({ onDismiss }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>🎭 Demo Mode Active</Text>
        <Text style={styles.subtitle}>Try these demo accounts:</Text>
        
        <View style={styles.credentialBox}>
          <Text style={styles.credential}>📧 alice@demo.com</Text>
          <Text style={styles.credential}>📧 bob@demo.com</Text>
          <Text style={styles.credential}>📧 carol@demo.com</Text>
          <Text style={styles.password}>🔑 Password: demo123</Text>
        </View>
        
        <Text style={styles.note}>
          All data is stored locally for demonstration. 
          Create new accounts or use existing demo users!
        </Text>
        
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={styles.dismissText}>Got it!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 24,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontFamily: 'RobotoFlex-Bold',
    color: '#0063FB',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'RobotoFlex-Medium',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  credentialBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  credential: {
    fontSize: 14,
    fontFamily: 'RobotoFlex-Regular',
    color: '#0063FB',
    marginBottom: 4,
    textAlign: 'center',
  },
  password: {
    fontSize: 14,
    fontFamily: 'RobotoFlex-Medium',
    color: '#28A745',
    marginTop: 8,
    textAlign: 'center',
  },
  note: {
    fontSize: 12,
    fontFamily: 'RobotoFlex-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 16,
  },
  dismissButton: {
    backgroundColor: '#0063FB',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  dismissText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'RobotoFlex-Bold',
  },
});

export default DemoInfo;
