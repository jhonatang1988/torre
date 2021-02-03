import { Link } from '@material-ui/core'
import { searchRecent } from '../../../../lib/torre/search'

function SearchLink (props) {
  function handleShowRecentSearchResults () {
    searchRecent(props.data)
  }
  return (
    <Link component='button' color='primary' variant='inherit' onClick={handleShowRecentSearchResults}>{props.text}</Link>
  )
}

export default SearchLink
