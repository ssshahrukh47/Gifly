import { StyleSheet } from "react-native"
import { COLORS } from "../../res/themes/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    padding: 16,
  },
  gif: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginVertical: 12
  },

  error: {
    fontSize: 14,
    marginVertical: 12,
    textAlign: 'center',
    color: COLORS.error
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.black,
    minHeight: 100,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
})
export default styles