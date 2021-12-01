const eventsFilter = (events, categories, dates) => {
  const eventsData = []
  for (const ev of events) {
    if (categories[ev.categories[0].id]) {
      for (const geo of ev.geometry) {
        const geoDate = geo.date.slice(0, 10)
        if (geoDate >= dates[0] && geoDate <= dates[1]) {
          eventsData.push([
            ev.id,
            ev.categories[0].id,
            ev.title,
            geo.coordinates,
            geo.date,
            geo.magnitudeUnit,
            geo.magnitudeValue,
            (ev.geometry.indexOf(geo) + 1) / ev.geometry.length,
            ev.sources[0].id,
            ev.sources[0].url
          ])
        }
      }
    }
  }
  return eventsData
}

export default eventsFilter
