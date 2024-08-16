import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    gap: 6,
  },
  iban: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'crimson',
  },
});
