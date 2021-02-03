import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { firebase } from '../../lib/firebase'
import React, { useEffect } from 'react'
import GlobalHeader from '../../components/header'
import SearchLink from '../../components/recent_searches_list/recent_search_item/search_link'
import UpdatesCounter from '../../components/recent_searches_list/recent_search_item/updates_counter'
import EmailNotification from '../../components/recent_searches_list/recent_search_item/email_notification'
import SystemNotification from '../../components/recent_searches_list/recent_search_item/system_notification'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../components/recent_searches_list/recent_search_item/styles'
import Button from '@material-ui/core/Button'
import fillTestSearches from '../../lib/torre/fill_test_searches'
import getUpdates from '../../lib/torre/get_updates'
import SearchResultList from '../../components/search_results_list'
import Container from '@material-ui/core/Container'

export default function SearchPage () {
  const classes = useStyles()
  const [value, loading, error] = useCollectionData(
    firebase.firestore().collection('recent_searches'),
    {
      idField: 'id'
    }
  )

  const [results, resultLoading, resultError] = useDocumentData(
    firebase.firestore().doc('result/UniqueDocA'),
    {
      idField: 'id'
    }
  )

  useEffect(() => {
    firebase.firestore().doc('result/UniqueDocA').set({ exists: true })
    getUpdates()
  }, [])

  function toogleNotification (event, checked, caller, docId) {
    let keyModifier = 'email_notifications'
    if (caller === 'SystemNotification') keyModifier = 'system_notifications'
    const docRef = firebase.firestore().doc(`recent_searches/${docId}`)
    docRef.update(keyModifier, !checked)
  }

  return (
    <div>
      <GlobalHeader />
      <Container display='flex' maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Cargando Busquedas recientes...</span>}
            {value && (
              <>
                <p>Recent Searches:</p>
                {value.map((element) => (
                  <Grid container spacing={1} direction='row' justify='flex-start' alignItems='baseline' key={element.id}>
                    <Grid item>
                      <SearchLink id={element.id} text={element.text} data={element} />
                    </Grid>
                    <Grid item>
                      <UpdatesCounter id={element.id} color={element.updates_counter ? classes.enableNotifications : classes.noUpates} updates_counter={element.updates_counter} />
                    </Grid>
                    <Grid item>
                      <SystemNotification id={element.id} color={element.system_notifications ? classes.enableNotifications : classes.disableNotifications} checked={element.system_notifications} onClick={toogleNotification} />
                    </Grid>
                    <Grid item>
                      <EmailNotification id={element.id} color={element.email_notifications ? classes.enableNotifications : classes.disableNotifications} checked={element.email_notifications} onClick={toogleNotification} />
                    </Grid>
                  </Grid>
                ))}
                <Button variant='outlined' color='primary' onClick={() => fillTestSearches(value)}>
                Reload Search Tests
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={8}>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Cargando Resultados de Busqueda</span>}
            {results && (
              <SearchResultList results={results} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
