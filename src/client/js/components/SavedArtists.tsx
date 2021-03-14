import * as React from 'react'
import { GlobalStateContext } from '@utils/globalState'

import Text from '@components/shared/widgets/Text'
import Button from '@components/shared/widgets/Button'

import ArtistRow from '@components/shared/ArtistRow'

import AddArtistsModal from '@components/AddArtistsModal'

const SearchIcon = require('@images/icons/search.svg').default

const styles = require('./SavedArtists.scss').default

const SavedArtists: React.FC = () => {
  const [filterText, setFilterText] = React.useState('')
  const { state } = React.useContext(GlobalStateContext)
  const artists = state.userArtists

  const filteredArtists = Object.values(artists as { [key: string]: any }).filter(a => a.name.toLowerCase().match(filterText.toLowerCase()))
  const hasArtists = Object.values(artists).length > 0
  const hasVisibleArtists = filteredArtists.length > 0

  const artistTable = (
    <div className={styles.artistsContainer}>
      {
        hasVisibleArtists ?
          filteredArtists.map((artist, index) => {
            return <ArtistRow key={index} artist={artist} onUserList={true} />
          })
          :
          hasArtists ?
            <p>No artists visible using current search</p> :
            <p>No saved artists, please add using the button above.</p>}
    </div>
  )

  return (
    <div id={styles.container}>
      <h1>Your Artists</h1>
      <div className={styles.actions}>
        {hasArtists && <Text
          placeholder='Search for Artist...'
          onChange={text => setFilterText(text)}
          icon={<SearchIcon />} />}
        <AddArtistsModal>
          <Button type='primary' className={styles.button}>Add</Button>
        </AddArtistsModal>
      </div>
      {artistTable}
    </div>
  )
}

export default SavedArtists

