const eventsTransform = (events) => {
  events.map(ev => {
    return ev.geometry.map(geo => {
      return geo.coordinates.reverse()
    })
  })
  return events
}

export default eventsTransform
