import React, { Component } from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Locations} from './Locations'
import fetchJsonp from 'fetch-jsonp'
import {styles} from './mapStyle.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
// import child component
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        locations:Locations,
        styles:styles,
          query:'',
        showingInfoWindow: false,
        infoWindowPosition: {},
        selectedPlace: {}
}}


componentDidMount(){
  //fetch place data from foursquare
  var clientId = "HF3BU44KUBB3JY1B2YBPHDBDHFNE5CJKWRDFW3WU45PTDQCP";
  var clientSecret ="A2EYKSCFCVAOVJWWI5RTSJBWCYGGNXHEOGQBN5F2XKBNLHAV";
  this.state.locations.map((location)=>{
    return fetchJsonp(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20130815&ll=${location.position.lat},${location.position.lng}&limit=1`).
    then(response => response.json()).then(responseJson =>{
      var locationData = responseJson.response.venues[0]
      location.info =locationData.location.formattedAddress
      location.link = `https://foursquare.com/v/${locationData.id}`
      console.log(locationData)
    }).catch(error => console.error())
  })
  /*const map = document.querySelector('#mapContainer > div > div')
  map.setAttribute("tabindex", -1)
  const mapFirstChild = document.querySelector('#mapContainer > div')
  mapFirstChild.setAttribute("tabindex", -1)
  console.log(map)
  console.log(mapFirstChild)*/


}
//set and show the infow window when marker click
onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      infoWindowPosition:props.position,
      showingInfoWindow:true
    });

  }
//update query in the state when the user enter text in the search input
updateQuery = (query) => {
  this.setState({query:query,
    showingInfoWindow: false,
    infoWindowPosition: {}
  })
}
//hide the InfoWindow and reset its position when the map clicked
onMapClick = ()=> {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        infoWindowPosition: {}
      });
    }
  }
  //hide the InfoWindow and reset its position when the InfoWindow closed
  onInfoWindowClose = ()=> {
      this.setState({
        showingInfoWindow: false,
        infoWindowPosition: {}
      })
    }
    //show the InfoWindow on specific position when list item clicked
    onListViewItemClick =(location) =>{
    this.setState({
      infoWindowPosition:location.position,
      showingInfoWindow:true,
      selectedPlace: location
    })
    }
    //Show  and hide the nav side when humbrgur icon clicked
    handleBurgerIconClick = ()=>{
      const listView = document.querySelector('#listView');
      const map = document.querySelector('#mapContainer');
           listView.classList.toggle('open');
           listView.classList.toggle('offscreen');
           listView.classList.toggle('col-8');
           listView.classList.toggle('col-md-4');
           listView.classList.toggle('col-lg-2');
            map.classList.toggle('col-4');
            map.classList.toggle('col-md-8');
            map.classList.toggle('col-lg-10');

           }
          //show the InfoWindow on specific position when the enter or space key press on listView item
           handlerKeyPress(event,location) {
             console.log('key is pressed')
           if (event.key === " " || event.key === "Enter") {
               // Prevent the default action to stop scrolling when space is pressed
               event.preventDefault();
               this.setState({
                 infoWindowPosition:location.position,
                 showingInfoWindow:true,
                 selectedPlace: location
               })
           }
       }

  render() {


    let showLocations
      const {query,locations} = this.state
      //initialize the bounds of the map
      var bounds = new this.props.google.maps.LatLngBounds();
      //update the locations of the marks on the map based on query value
      if(query){
        const match = new RegExp(escapeRegExp(query),'i')
        showLocations = locations.filter((location) =>
          match.test(location.title))
              }
      else{
              showLocations = locations
          }
          showLocations.map((location)=>{
         bounds.extend(location.position);
          })
          //sort the locations by the title on the listView
      showLocations.sort(sortBy('title'))
         //check if the map is loaded if it is not loaded show loading
         if (!this.props.loaded) {
         return <div>Loading...</div>
            }
          //the info of selected place
      var selectedPlace = this.state.selectedPlace
      const AllLocations = this.state.locations
      //adding style empty to reset the style of the Map component  so I can control its height from the css file
       const style = {
        }
    return (
        <div className ='container-fluid'>
         <div id ='header' className='row'>
        <div  id ='biconParent' ria-labelledby = 'hamburger icon'className ='col-2' role ='button' onClick ={this.handleBurgerIconClick}  >
        <div className='bicon'></div>
        <div className='bicon'></div>
        <div className='bicon'></div>
        </div>
        <div id='title' tabIndex ='1' className='col-10'>Neighborhood Map</div>
        </div>
        <div id='content-row' className='row'>
      <div id ='listView' className='offscreen'>

       <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="input-group-text d-md-inline-flex d-none" id="basic-addon1">Filter</span>
       </div>
      <input role="search" tabIndex ='1' aria-labelledby="filter" id="search-field" className="form-control" type="text" placeholder="Enter place name"
      value={this.state.query} onChange={(event)=>this.updateQuery(event.target.value)}/>
      </div>
       <div>
       <ul className="list-group" aria-labelledby = 'locations list' tabIndex ='1'>
          {showLocations.map((location,index)=>(
            <li className ='list-group-item list-group-item-dark'
            role='button'
            key={index}
            tabIndex = {index+2}
            onClick={()=>(this.onListViewItemClick(location))}
            onKeyPress={(event) => this.handlerKeyPress(event, location)}
            aria-labelledby = {`View Details for ${location.title}`}
            >{location.title}</li>
          ))}
        </ul>
       </div>
      </div>
      <div id='mapContainer'  aria-label="Map showing places" tabIndex = '0' role = 'Application' >
      <Map google={this.props.google}
      onClick={this.onMapClick}
       initialCenter = {{lat:51.4980479,lng:-0.0105351 }}
       bounds = {bounds}
       styles ={this.state.styles}
       style ={style}>
      {showLocations.map((location,index)=>(
        <Marker
          title = {location.title}
          position = {location.position}
          title = { location.title}
          key = {index}
          onClick={this.onMarkerClick}
          address = {location.address}
          info ={location.info}
          link = {location.link}
          animation={this.props.google.maps.Animation.DROP}


        />
      ))}
      <InfoWindow
         position={new this.props.google.maps.LatLng(this.state.infoWindowPosition.lat,this.state.infoWindowPosition.lng)}
         visible={this.state.showingInfoWindow}
         onClose={this.onInfoWindowClose}>
           <div className = 'info-box' tabIndex="0">
             <p  tabIndex="0" className ='font-weight-bold'>{this.state.selectedPlace.title}<p><small>Address</small></p></p>

             {(selectedPlace.info && selectedPlace.info.length > 0) ?(
               selectedPlace.info.map((inf,index)=>(
                 <span className='address' key ={index} >{inf+' , '}</span>
             ))):(
                 <p className='address' >No Info Found Please Wait </p>
               )
              }
            <a  tabIndex="0" href={`${this.state.selectedPlace.link}`} target="_blank">Click Here For More Info </a>

           </div>
    </InfoWindow>
      </Map>
      </div>
      </div>
      </div>
    )
  }
  }

export default GoogleApiWrapper({
  apiKey:'AIzaSyAKbEWN6efrkQm26KtDn56Sv1IwCayn9JU',
})(App)
