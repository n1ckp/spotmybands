import React from 'react'

import Text from 'components/presentational/widgets/Text'
import Button from 'components/presentational/widgets/Button'

import ArtistRow from 'components/presentational/tables/ArtistRow'

import AddArtistsModalContainer from 'components/container/AddArtistsModalContainer'

import SearchIcon from 'icons/search.svg'

import styles from 'components/SavedArtists.scss'

export default class SavedArtists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
  }

  onChangeSearchText(text) {
    console.log(text)
  }

  renderArtistTable() {
    return (
      <div className={styles.artistsContainer}>
        {Object.values(this.props.artists).map((artist, index) => {
          return <ArtistRow key={index} artist={artist} />
        })}
      </div>
    )
  }

  render() {
    console.log(this.props.artists)
    return (
      <div id={styles.container}>
        <h1>Your Artists</h1>
        <div className={styles.actions}>
          <Text
            placeholder='Search for Artist...'
            onChange={this.onChangeSearchText}
            icon={<SearchIcon />} />
          <Button text='Add Artists' type='primary' onClick={() => this.setState({modalOpen: true})} />
        </div>
        {this.renderArtistTable()}
        <AddArtistsModalContainer
          open={this.state.modalOpen}
          onCloseModal={() => this.setState({modalOpen: false})} />
      </div>
    )
  }
}
