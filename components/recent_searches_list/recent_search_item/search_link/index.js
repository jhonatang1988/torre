import { Link } from '@material-ui/core'

function SearchLink (props) {
  return (
    <Link color='primary' variant='inherit' href={props.link}>{props.text}</Link>
  )
}

export default SearchLink
