import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {spotifySearchArtists, addUserArtist} from 'redux/actions'

import ModalPanel from 'components/ModalPanel'
import Text from 'components/shared/widgets/Text'
import ArtistRow from 'components/shared/ArtistRow'

import SearchIcon from 'icons/search.svg'

import styles from './AddArtistsModal.scss'

const AddArtistsModal = props => {
  const {children, loadingSpotifyArtists, spotifyArtists, userArtists, addToUserList} = props
  const [open, setModalOpen] = useState(false)
  const [artistSearchText, setArtistSearchText] = useState('')
  const artistSearch = useRef()

  const onChangeArtistSearch = text => {
    clearTimeout(artistSearch.current)
    artistSearch.current = setTimeout(() => {
      props.spotifySearchArtist(text)
    }, 500)
    setArtistSearchText(text)
  }

  let artistSearchResults

  if (loadingSpotifyArtists) {
    artistSearchResults = <p>Loading...</p>
  }
  else if (spotifyArtists) {
    artistSearchResults = (
      <div className={styles.artists}>
        {spotifyArtists.map((a, index) => {
          return <ArtistRow key={index}
            artist={a}
            addToUserList={artist => addToUserList(artist)}
            onUserList={userArtists[a.id] !== undefined} />
        })}
      </div>
    )
  }

  return (
    <>
      <div onClick={() => setModalOpen(true)}>{children}</div>
      <ModalPanel
        open={open}
        onClose={() => setModalOpen(false)}>
        <div id={styles.container}>
          <div className={styles.actions}>
            <Text
              placeholder='Search for Artist...'
              onChange={text => onChangeArtistSearch(text)}
              icon={<SearchIcon />} />
          </div>
          <div className={styles.artistsContainer}>
            {artistSearchResults}
          </div>
        </div>
      </ModalPanel>
    </>
  )
}

AddArtistsModal.propTypes = {
  loadingSpotifyArtists: PropTypes.bool,
  userArtists:           PropTypes.object,
  spotifyArtists:        PropTypes.array,
  addToUserList:         PropTypes.func,
  spotifySearchArtist:   PropTypes.func,
  children:              PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const mapStateToProps = state => {
  return {
    loadingSpotifyArtists: state.spotify.artists.loading,
    spotifyArtists:        state.spotify.artists.list,
    userArtists:           state.userArtists,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    spotifySearchArtist: searchText => {
      dispatch(spotifySearchArtists(searchText))
    },
    addToUserList: artist => {
      dispatch(addUserArtist(artist.id, artist))
    },
  }
}

const AddArtistsModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddArtistsModal)

export default AddArtistsModalContainer
