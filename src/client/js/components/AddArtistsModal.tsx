import * as React from 'react'
import { connect } from 'react-redux'

import { spotifySearchArtists, addUserArtist, clearSpotifyArtists } from '@redux/actions'

import ModalPanel from '@components/ModalPanel'
import Text from '@components/shared/widgets/Text'
import ArtistRow from '@components/shared/ArtistRow'

const SearchIcon = require('@images/icons/search.svg').default

const styles = require('./AddArtistsModal.scss').default

type SpotifyArtist = {
  id: string,
}

type AddArtistsModalProps = {
  loadingSpotifyArtists: boolean,
  userArtists: Object,
  spotifyArtists: SpotifyArtist[],
  addToUserList: (artist: Object) => void,
  spotifySearchArtist: (searchText: string) => void,
  children: React.ReactNode,
}

const AddArtistsModal: React.FC<AddArtistsModalProps> = props => {
  const { children, loadingSpotifyArtists, spotifyArtists, userArtists, addToUserList } = props
  const [open, setModalOpen] = React.useState(false)
  const artistSearch = React.useRef(null)
  const searchTextEl = React.useRef(null)

  React.useEffect(() => {
    if (open) {
      searchTextEl.current.focus()
    }
  }, [open])

  const handleChangeArtistSearch = text => {
    window.clearTimeout(artistSearch.current)
    artistSearch.current = window.setTimeout(() => {
      props.spotifySearchArtist(text)
    }, 500)
  }

  let artistSearchResults

  if (loadingSpotifyArtists) {
    artistSearchResults = <p>Loading...</p>
  }
  else if (spotifyArtists) {
    artistSearchResults = (
      <div>
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
              onChange={text => handleChangeArtistSearch(text)}
              icon={<SearchIcon />}
              ref={searchTextEl} />
          </div>
          <div className={styles.artistsContainer}>
            {artistSearchResults}
          </div>
        </div>
      </ModalPanel>
    </>
  )
}

const mapStateToProps = state => {
  return {
    loadingSpotifyArtists: state.spotify.artists.loading,
    spotifyArtists: state.spotify.artists.list,
    userArtists: state.userArtists,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    spotifySearchArtist: searchText => {
      if (searchText && searchText !== '') {
        dispatch(spotifySearchArtists(searchText))
      }
      else {
        dispatch(clearSpotifyArtists())
      }
    },
    addToUserList: artist => {
      dispatch(addUserArtist(artist.id, artist))
    },
  }
}

const AddArtistsModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddArtistsModal)

export default AddArtistsModalContainer
