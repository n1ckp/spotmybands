import React from 'react'
import PropTypes from 'prop-types'

import ModalPanel from 'components/presentational/ModalPanel'
import Text from 'components/presentational/widgets/Text'
import ArtistRow from 'components/presentational/tables/ArtistRow'

import SearchIcon from 'icons/search.svg'

import styles from 'components/AddArtistsModal.scss'

export default class AddArtistsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artistSearchText: ''
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
      console.log(this.props.spotifyArtists)
      return (
        <div className={styles.artists}>
          {this.props.spotifyArtists.map((a, index) => {
            let artist = {
              name: a.name,
            }
  
            if (a.images && a.images.length) {
              artist.logoURL = a.images[0].url
            }
  
            return <ArtistRow key={index} artist={artist} />
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <ModalPanel
        open={this.props.open}
        onClose={() => this.props.onCloseModal()}>
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
    )
  }
}

AddArtistsModal.propTypes = {
  open: PropTypes.bool,
  onCloseModal: PropTypes.func,
}