import {connect} from 'react-redux'

import SavedArtists from 'components/presentational/SavedArtists'

const mapStateToProps = (state, ownProps) => {
  return {
    artists: [
      {
        'logoURL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/RHCP_Logo.svg/2000px-RHCP_Logo.svg.png',
        'name': 'The Red Hot Chili Peppers',
        'nextGigDate': '2018-08-01',
        'nextGigLocation': 'London',
      },
      {
        'logoURL': 'https://seeklogo.com/images/F/Foo_Fighters-logo-A7966CB57F-seeklogo.com.png',
        'name': 'Foo Fighters',
        'nextGigDate': '2018-07-20',
        'nextGigLocation': 'Manchester',
      },
      {
        'logoURL': 'http://www.clashmusic.com/sites/default/files/field/image/rsz_14.jpg',
        'name': 'D Double E',
        'nextGigDate': '2018-06-26',
        'nextGigLocation': 'Forest Gate, London',
      },
    ]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const SavedArtistsContainer = connect(mapStateToProps, mapDispatchToProps)(SavedArtists)

export default SavedArtistsContainer
