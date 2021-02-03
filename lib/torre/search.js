import { firebase } from '../firebase'

function saveToFirebase (url, item, id, resultIds, oldResults, test) {
  if (test) resultIds = resultIds.slice(0, 15)
  let textBuilder = ''

  for (const elem of item.and) {
    const keys = Object.keys(elem)
    for (const firstKey of keys) {
      textBuilder += `${firstKey}: `
      for (const [, value] of Object.entries(elem[firstKey])) {
        if (value !== 'potential-to-develop') {
          textBuilder += `${value} `
        }
      }
    }
  }

  if (id === 'and') {
    const recentSearch = {
      created_at: firebase.firestore.Timestamp.now(),
      deleted: false,
      email_notifications: false,
      system_notifications: false,
      link: url,
      payload: JSON.stringify(item),
      result_ids: resultIds,
      text: textBuilder,
      updates_counter: 0
    }
    firebase.firestore().collection('recent_searches').add(recentSearch)
  } else {
    let updatesCounter = 0
    for (const oldResult of oldResults) {
      for (const [key, value] of Object.entries(oldResult)) {
        if (key === id) {
          console.log('entro')
          updatesCounter = resultIds.filter(e => !value.includes(e)).length
        }
      }
    }
    console.log(updatesCounter)
    const recentSearch = {
      result_ids: resultIds,
      updates_counter: updatesCounter
    }
    firebase.firestore().collection('recent_searches').doc(id).update(recentSearch)
  }
}

async function retrieveData (item, offset, page) {
  const url = `https://search.torre.co/opportunities/_search/?currency=USD%24&page=${page}&periodicity=hourly&lang=es&size=20&aggregate=false&offset=${offset}`
  const response = await window.fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(item)
  })

  const data = await response.json()

  return data
}

async function search (item, oldResults, test, callback) {
  const initialUrl = 'https://search.torre.co/opportunities/_search/?currency=USD%24&page=0&periodicity=hourly&lang=es&size=20&aggregate=false&offset=0'
  const resultIds = []
  let stopped = false
  let offset = 0
  let page = 0
  let id = ''

  id = Object.keys(item)[0]

  if (id !== 'and') {
    item = Object.values(item)[0]
  }

  while (!stopped) {
    const data = await retrieveData(item, offset, page)

    for (const result in data.results) {
      resultIds.push(data.results[result].id)
    }

    if (data.results.length === 0) {
      stopped = true
    } else {
      offset += data.results.length
      page++
    }
  }

  callback(null, saveToFirebase(initialUrl, item, id, resultIds, oldResults, test))
}

function allDone (err) {
  if (err) {
    // One of the iterations produced an error.
    // All processing will now stop.
    console.log('A file failed to process')
  } else {
    console.log('All files have been processed successfully')
  }
}

export { search, allDone }
