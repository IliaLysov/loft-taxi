import React, {Component} from 'react'
import mapboxGl from 'mapbox-gl'
import './style.css'
import { connect } from "react-redux"


class Map extends Component {
    mapContainer = React.createRef();
    map = null;


    componentDidMount() {

        mapboxGl.accessToken = "pk.eyJ1IjoibGlzb3YiLCJhIjoiY2xiN3lib2drMDlyMzNubjVvZWlubWh5OSJ9.4kkxGrn9aFyGWxvtY2yzcA"

        this.map = new mapboxGl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [41.650458, 41.630216],
            zoom: 10
        })
        
    }
    
    componentDidUpdate() {
        const {routeCoordinates} = this.props
        
        this.map.flyTo({
            center: routeCoordinates[0],
            zoom: 15
        })

        this.map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: routeCoordinates
                }
              }
            },
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#ffc617",
              "line-width": 8
            }
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

export default connect(state => ({routeCoordinates: state.auth.routeCoordinates}))(Map)