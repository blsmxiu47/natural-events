const eventsTransform = (events, categories, dates) => {
    console.log("eventsTransform...");
    let eventsData = [];
    for (const ev of events) {
        if (ev.categories[0].id) {
            if (categories[ev.categories[0].id]) {
                let numGeos = ev.geometry.length;
                for (const geo of ev.geometry) {
                    let geoDate = geo.date.slice(0, 10);
                    if (geoDate >= dates[0] && geoDate <= dates[1]) {
                        const geoData = [
                            ev.id, 
                            ev.categories[0].id, 
                            ev.title,
                            geo.coordinates.reverse(), 
                            geo.date, 
                            geo.magnitudeUnit, 
                            geo.magnitudeValue, 
                            (ev.geometry.indexOf(geo)+1) / numGeos,
                        ];
                        // yield geoData; maybe later
                        eventsData.push(geoData);
                    }
                }
            }
        } else {
            let evCat = ev.categories.replace(/\s+/g, "").replace(/(and)+/g, "");
            evCat = evCat.charAt(0).toLowerCase() + evCat.slice(1);
            if (categories[evCat]) {
                let numGeos = ev.geometry.length;
                for (const geo of ev.geometry) {
                    let geoDate = geo.date.slice(0, 10);
                    if (geoDate >= dates[0] && geoDate <= dates[1]) {
                        const geoData = [
                            ev.id, 
                            evCat, 
                            ev.title,
                            geo.coordinates, 
                            geo.date, 
                            geo.magnitudeUnit, 
                            geo.magnitudeValue, 
                            (ev.geometry.indexOf(geo)+1) / numGeos,
                        ];
                        // yield geoData;
                        eventsData.push(geoData);
                    }
                }
            }
        }
    }
    return eventsData;
}

export default eventsTransform