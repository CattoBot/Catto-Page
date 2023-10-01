var User, language_cachedValue = language

window.onload = async () => {
  try {
    await myDB.initDB("database")
    await refreshData()
    loadNavigation()
    loadLists()
    User = new user()
    await User.load()
  } catch (e) {
    throwError(e, 0)
  } finally {
    loader.disable()
  }
}