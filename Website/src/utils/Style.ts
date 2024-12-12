import { StyleSheet } from 'react-native';

// Dark UI background
export const darkTheme = {
  backgroundBlack: '#000000', 
  cardBlack: '#121212',
  textWhite: '#FFFFFF',
  accentYellow: '#FFCD00',
  accentGray: "#BBBCBC",
  accentGreen: "#009688",
};

// component common styles
const commonStyle = StyleSheet.create({
  container: { 
    padding: 20,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Antonio-bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  memberContainer: {
    alignItems: 'center',
    margin: 20,
  },
  memberButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },
  projectButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  memberImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    padding: 10,
  },
  projectImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: darkTheme.cardBlack,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Antonio-regular',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Antonio-bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    height: 40,
    borderColor: darkTheme.accentYellow,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: darkTheme.textWhite,
    backgroundColor: darkTheme.cardBlack,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nameText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-regular',
  },
  content: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center',
    fontFamily: 'Antonio-bold',
    color: darkTheme.accentYellow,
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 10, 
    color: '#FFF',
    fontFamily: 'Roboto-regular',
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
  textArea: {
    height: 100,
    borderColor: darkTheme.accentYellow,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: darkTheme.cardBlack,
    color: darkTheme.textWhite,
    paddingVertical: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: darkTheme.backgroundBlack,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: darkTheme.accentYellow,
    borderRadius: 5,
    backgroundColor: darkTheme.cardBlack,
    width: '50%',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  formContent: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkTheme.accentYellow,
    textAlign: 'center',
    marginBottom: 15,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
  },
  formInput: {
    height: 40,
    borderColor: darkTheme.accentYellow,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: darkTheme.cardBlack,
    color: darkTheme.textWhite,
    alignSelf: 'stretch',
  },
  formTextArea: {
    height: 100,
    borderColor: darkTheme.accentYellow,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: darkTheme.cardBlack,
    color: darkTheme.textWhite,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    marginTop: 15,
    marginVertical: 10,
  },
  formButtonContainer: {
    marginTop: 15,
    width: '50%',
    alignSelf: 'center',
  },

  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  status: {
    color: darkTheme.accentGreen,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default commonStyle;
