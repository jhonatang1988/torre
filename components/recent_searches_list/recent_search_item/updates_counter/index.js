import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '1rem',
    backgroundColor: grey[900]
  }
}))

function UpdatesCounter (props) {
  const classes = useStyles()
  return (
    <Avatar className={`${classes.small} ${props.color}`}>{props.updates_counter.toString()}</Avatar>
  )
}

export default UpdatesCounter
