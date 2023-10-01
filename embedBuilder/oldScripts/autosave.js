const autosave = {
  save(forzar) {
    if (loader.active && !forzar) return
    myIndexedDB.deleteItem("embeds", [actualEmbedID, actualProyectID])
    if(!embedsData.filter(x=>x.id==actualEmbedID&&x.proyect==actualProyectID)[0]) {
      (async ()=>{
        await Proyect.load()
      })
    }
    myIndexedDB.addElement("embeds", {
      json: JSON.stringify(Embed),
      emoji: "",
      roles: embedsData.filter(x=>x.id==actualEmbedID&&x.proyect==actualProyectID)[0].roles,
      proyect: actualProyectID,
      id: actualEmbedID
    })
  }
}