<script>

var data = { eventData: [] }

// var vm = new Vue({
//     data: data
// })


export default {
    name: 'Events',
    data: data,
    methods: {
        async getData() {
            try {
                // this.eventData = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires")
                //   .then(response => response.json())
                //   .then(data => data.events);
                let res = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires");
                this.eventData = await res.json();
                this.eventData = this.eventData.events;
                const events = this.eventData;
                for (let i = 0; i < events.length; i++) {
                    let e = events[i]
                    let sources_array = []
                    for (let j = 0; j < e.sources.length; j++) {
                        sources_array.push(e.sources[j].id);
                    }
                    let dates_array = []
                    for (let j = 0; j < e.geometry.length; j++) {
                        dates_array.push(e.geometry[j].date);
                }
                events[i].sources = sources_array
                events[i].date = dates_array
                }
                console.log(typeof events);
                console.log(events);

                return events   
            } catch (error) {
                console.log(error);
                return []
            }
        }
    },
    // created() {
    //     this.getData();
    // },
}
</script>