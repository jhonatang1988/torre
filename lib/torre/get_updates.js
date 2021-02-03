import { search, allDone } from './search'
import each from 'async/each'
import { firebase } from '../../lib/firebase'

function getUpdates () {
  const payloads = []
  const oldResults = []
  firebase.firestore().collection('recent_searches').get().then(
    (querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        const objIdPayload = {}
        objIdPayload[doc.id] = JSON.parse(doc.data().payload)
        payloads.push(objIdPayload)

        const oldIdOldResults = {}
        oldIdOldResults[doc.id] = doc.data().result_ids
        oldResults.push(oldIdOldResults)
      })
      return [payloads, oldResults]
    }
  ).then(([payloads, oldResults]) => {
    const test = false
    each(payloads, (item, callback) => search(item, oldResults, test, callback), allDone)
  })
}

export default getUpdates
