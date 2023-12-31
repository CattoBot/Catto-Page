const Embed = new embed()
const Proyect = new proyect()
var actualProyectID, actualEmbedID, proyectsData, embedsData

window.onload = async function () {

  await myIndexedDB.startDB()
  proyectsData = await myIndexedDB.displayData("proyects")
  embedsData = await myIndexedDB.displayData("embeds")
  await sleep(1000)

  loadNavigation()
  loadLists()

  if (proyectsData.length < 1) {
    actualProyectID = "New embed"
    actualEmbedID = "New page"
    buildDefaultProyect(buildDefaultEmbed("New embed"))
    var proyectsData = await myIndexedDB.displayData("proyects")
    var embedsData = await myIndexedDB.displayData("embeds")
    await sleep(1000)
  } else {
    actualProyectID = proyectsData[0].id
    actualEmbedID = proyectsData[0].embeds.split(/,/g)[0]
  }

  Embed.getFromJSON(
    JSON.parse(embedsData.filter(x => x.id == actualEmbedID)[0].json)
  ).build()
  await Proyect.load()
  await Proyect.build()

  setInterval(function () {
    Embed.get().updateColor()
    autosave.save()
    document.getElementById("codeTextarea").innerHTML = JSON.stringify(Embed, undefined, 2)
  }, 250)

  loader.principal.disable()
}