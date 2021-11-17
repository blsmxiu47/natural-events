const eventsTransform = (events) => {
    console.log("eventsTransform...", events);
    events.map(ev => {
        ev.geometry.map(geo => {
            geo.coordinates.reverse()
        })
    })
    return events
}

export default eventsTransform