import SearchResult from './search_result'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'scroll',
    maxHeight: 700
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  }
}))

function SearchResultList (props) {
  const classes = useStyles()
  const jobs = props.results.results

  if (props.results.exists && !jobs) {
    return (
      <p>Select any recent search from the sidebar</p>
    )
  } else {
    return (
      <List className={classes.root}>
        {
          jobs.map(job => (
            <ListItem key={job.id}>
              <SearchResult jobInfo={job} />
            </ListItem>
          ))
        }
      </List>
    )
  }
}

export default SearchResultList
