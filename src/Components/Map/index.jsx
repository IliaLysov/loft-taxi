import React, {Component} from 'react'
import mapboxGl from 'mapbox-gl'
import './style.css'

export default class Map extends Component {
    mapContainer = React.createRef();
    map = null;

    componentDidMount() {
        mapboxGl.accessToken = "pk.eyJ1IjoibGlzb3YiLCJhIjoiY2xiN3lib2drMDlyMzNubjVvZWlubWh5OSJ9.4kkxGrn9aFyGWxvtY2yzcA"

        this.map = new mapboxGl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [41.650458, 41.630216],
            zoom: 10
        })

    }

    componentWillUnmount() {
        this.map.remove()
    }

    render() {
        return <div className='map-wrapper'>
            <div data-testid="map" className="map" ref={this.mapContainer}></div>
        </div>
    }
}