import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  topContainer: {
    width: '100%',
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  validationSoFarIcon: {
    position: 'absolute',
    zIndex: 10,
    right: 16,
    bottom: 14,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  validIbanSuggestionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  validIbanSuggestionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  validIbanSuggestionButton: {
    backgroundColor: 'green',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  validIbanSuggestionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: 'crimson',
    borderRadius: 15,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
