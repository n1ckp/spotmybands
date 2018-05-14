import React from 'react'

import Text from 'components/presentational/widgets/Text'

import ArtistRow from 'components/presentational/tables/ArtistRow'

import SearchIcon from 'icons/search.svg'

import styles from 'components/SavedArtists.scss'

export default class SavedArtists extends React.Component {
  onChangeSearchText(text) {
    console.log(text)
  }

  renderArtistTable() {
    return (
      <div className={styles.artistsContainer}>
        {this.props.artists.map((artist, index) => {
          return <ArtistRow key={index} artist={artist} />
        })}
      </div>
    )
  }

  render() {
    return (
      <div id={styles.container}>
        <h1>Your Artists</h1>
        <div className={styles.actions}>
          <Text
            placeholder='Search for Artist...'
            onChange={this.onChangeSearchText}
            icon={<SearchIcon />} />
        </div>
        {this.renderArtistTable()}
      </div>
    )
  }
}
