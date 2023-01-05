import React, {Component} from 'react'
import mapboxGl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
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
            center: [30.299499, 59.898466],
            zoom: 10
        })
        
    }
    
    componentDidUpdate() {
        const {routeCoordinates, routeStatus} = this.props

        // const routeCenter = routeCoordinates[routeCoordinates.length-1].map((e, i) => (e + routeCoordinates[0][i])/2)
        
        this.map.flyTo({
            center: routeCoordinates[0],
            zoom: 14
        })

        if (routeStatus) {
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
        } else {
          if (this.map.getLayer("route")) {
            this.map.removeLayer("route")
          }
          if (this.map.getSource("route")) {
            this.map.removeSource("route")
          }
        }
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

export default connect(state => ({routeCoordinates: state.auth.routeCoordinates, routeStatus: state.auth.routeStatus}))(Map)