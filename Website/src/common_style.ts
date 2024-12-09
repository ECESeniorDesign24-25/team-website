import { StyleSheet } from 'react-native';

const commonStyle = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    width: '50%',    
    padding: 20,     
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  footer: {
    marginBottom: 20, 
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  downloadContainer: {
    alignSelf: 'center',
    width: '60%',
  },
});

export default commonStyle;
