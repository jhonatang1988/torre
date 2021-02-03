import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '1rem'
  }
}))

function UpdatesCounter (props) {
  const classes = useStyles()
  return (
    <Avatar className={classes.small}>{props.updates_counter.toString()}</Avatar>
  )
}

export default UpdatesCounter
