import IconButton from '@material-ui/core/IconButton'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

function EmailNotification (props) {
  return (
    <IconButton className={props.color} checked={props.email_notifications} aria-label='enable email notifications' onClick={(event) => props.onClick(event, props.checked, EmailNotification.name, props.id)}>
      <MailOutlineIcon />
    </IconButton>
  )
}

export default EmailNotification
