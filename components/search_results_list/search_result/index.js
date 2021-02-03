import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

function SearchResult (props) {
  const classes = useStyles()
  const jobInfo = props.jobInfo

  const locations = () => {
    let locationsText = ''
    if (jobInfo.locations.length > 0) {
      for (const location of jobInfo.locations) {
        locationsText += `${location} `
      }
    }
    if (jobInfo.remote) locationsText += 'Remoto'

    return <p>{locationsText}</p>
  }

  return (
    <Card className={classes.root} onClick={() => console.log('me cliquearon')}>
      <CardHeader
        avatar={
          <Avatar aria-label={jobInfo.organizations[0].name} className={classes.avatar} src={jobInfo.organizations[0].picture} />
        }
        title={jobInfo.organizations[0].name}
        subheader={jobInfo.objective}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='div'>
          <span>Tipo de contrato</span>: {jobInfo.type}
          <p>{jobInfo.organizations[0].name}</p>
          {locations()}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SearchResult
