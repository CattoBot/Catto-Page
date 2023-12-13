var user

window.onload = async () => {
  try {
    await myDB.initDB("database")
    await refreshData()
    user = new User()
  } catch (e) {
    console.error(e)
  } finally {
    loader.disable()
  }
}