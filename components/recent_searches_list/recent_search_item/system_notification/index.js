import IconButton from '@material-ui/core/IconButton'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'

function SystemNotification (props) {
  return (
    <IconButton className={props.color} checked={props.system_notifications} aria-label='enable system notifications' onClick={(event) => props.onClick(event, props.checked, SystemNotification.name, props.id)}>
      <NotificationsNoneIcon />
    </IconButton>
  )
}

export default SystemNotification
