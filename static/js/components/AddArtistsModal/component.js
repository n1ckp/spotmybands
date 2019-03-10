import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import ModalPanel from 'components/ModalPanel'
import Text from 'components/widgets/Text'
import ArtistRow from 'components/shared/ArtistRow'

import SearchIcon from 'icons/search.svg'

import styles from './styles.scss'

// const AddArtistsModal = props => {
//   const {children} = props
//   const [open, setModalOpen] = useState(false)
//   const [artistSearchText, setArtistSearchText] = useState('')
//   const artistSearch = useRef()

//   const onChangeArtistSearch = text => {
//     clearTimeout(this.artistSearch)
//     artistSearch.current = setTimeout(() => {
//       props.spotifySearchArtist(artistSearchText)
//     }, 2000)
//     setArtistSearchText(text)
//   }

//   return (
//     <>
//       <div onClick={() => setModalOpen(true)}>{children}</div>
//       <ModalPanel
//         open={open}
//         onClose={() => setModalOpen(false)}>
//         <div id={styles.container}>
//           <div className={styles.actions}>
//             <Text
//               placeholder='Search for Artist...'
//               onChange={text => onChangeArtistSearch(text)}
//               icon={<SearchIcon />} />
//           </div>
//           <div className={styles.artistsContainer}>
//             {this.renderArtistSearchResults()}
//           </div>
//         </div>
//       </ModalPanel>
//     </>
//   )
// }

export default class AddArtistsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open:             false,
      artistSearchText: '',
    }
    this.artistSearch = undefined
  }

  onChangeArtistSearch(artistSearchText) {
    clearTimeout(this.artistSearch)
    this.artistSearch = setTimeout(() => {
      this.props.spotifySearchArtist(artistSearchText)
    }, 2000)

    this.setState({artistSearchText})
  }

  renderArtistSearchResults() {
    if (this.props.loadingSpotifyArtists) {
      return <p>Loading...</p>
    }
    else if (this.props.spotifyArtists) {
      return (
        <div className={styles.artists}>
          {this.props.spotifyArtists.map((a, index) => {
            return <ArtistRow key={index}
              artist={a}
              addToUserList={artist => this.props.addToUserList(artist)}
              onUserList={this.props.userArtists[a.id] !== undefined} />
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <>
        <div onClick={() => this.setState({open: true})}>{this.props.children}</div>
        <ModalPanel
          open={this.state.open}
          onClose={() => this.setState({open: false})}>
          <div id={styles.container}>
            <div className={styles.actions}>
              <Text
                placeholder='Search for Artist...'
                onChange={text => this.onChangeArtistSearch(text)}
                icon={<SearchIcon />} />
            </div>
            <div className={styles.artistsContainer}>
              {this.renderArtistSearchResults()}
            </div>
          </div>
        </ModalPanel>
      </>
    )
  }
}

AddArtistsModal.propTypes = {
  loadingSpotifyArtists: PropTypes.bool,
  userArtists:           PropTypes.object,
  spotifyArtists:        PropTypes.array,
  addToUserList:         PropTypes.func,
  spotifySearchArtist:   PropTypes.func,
  children:              PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
