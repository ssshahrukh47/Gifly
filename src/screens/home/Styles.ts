import { StyleSheet } from "react-native"
import { COLORS } from "../../res/themes/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop:10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.lightGray,
  },
  emptyList: {
    flex: 1,
  },
})

export default styles