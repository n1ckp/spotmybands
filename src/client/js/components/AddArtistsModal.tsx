import * as React from 'react'
import { GlobalStateContext } from '@utils/globalState'
import { actionSpotifySearchArtists, actionClearSpotifyArtists } from '@utils/globalState/spotify'
import { actionAddUserArtist } from '@utils/globalState/userArtists'

import ModalPanel from '@components/ModalPanel'
import Text from '@components/shared/widgets/Text'
import ArtistRow from '@components/shared/ArtistRow'

const SearchIcon = require('@images/icons/search.svg').default

const styles = require('./AddArtistsModal.scss').default

type AddArtistsModalProps = {
  children: React.ReactNode,
}

const AddArtistsModal: React.FC<AddArtistsModalProps> = ({ children }) => {
  const [open, setModalOpen] = React.useState(false)
  const artistSearch = React.useRef(null)
  const searchTextEl = React.useRef(null)
  const { state, dispatch } = React.useContext(GlobalStateContext)

  const loadingSpotifyArtists = state.spotify.artists.loading
  const spotifyArtists = state.spotify.artists.list
  const userArtists = state.userArtists

  const spotifySearchArtist = (searchText: string) => {
    if (searchText && searchText !== '') {
      actionSpotifySearchArtists(dispatch, { searchText })
    }
    else {
      actionClearSpotifyArtists(dispatch)
    }
  }

  const addToUserList = (artist) => {
    actionAddUserArtist(dispatch, { artistID: artist.id, artist })
  }


  React.useEffect(() => {
    if (open) {
      searchTextEl.current.focus()
    }
  }, [open])

  const handleChangeArtistSearch = text => {
    window.clearTimeout(artistSearch.current)
    artistSearch.current = window.setTimeout(() => {
      spotifySearchArtist(text)
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

export default AddArtistsModal
