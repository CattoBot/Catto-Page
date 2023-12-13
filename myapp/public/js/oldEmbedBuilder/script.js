var user

window.onload = async () => {
  try {
    await myDB.initDB("database")
    await refreshData()
    loadNavigation()
    loadLists()
    user = new User()
    await user.load()
  } catch (e) {
    throwError(e, 0)
  } finally {
    loader.disable()
  }
}

document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  console.log(`Key pressed ${name} \r\nKey code value: ${code}`);
}, false);