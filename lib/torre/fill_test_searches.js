// fill searches
import each from 'async/each'
import { firebase } from '../firebase'
import { search, allDone } from './search'

function fillTestSearches (docs) {
  const test = true
  // first we erase old searches
  const docList = docs.map(doc => {
    return doc.id
  })

  for (const doc of docList) {
    firebase.firestore().collection('recent_searches').doc(doc).delete()
  }
  const data = [
    { and: [{ 'skill/role': { text: 'React', experience: 'potential-to-develop' } }, { status: { code: 'open' } }] },
    { and: [{ status: { code: 'open' } }, { 'skill/role': { text: 'django', experience: 'potential-to-develop' } }] },
    { and: [{ status: { code: 'open' } }, { 'skill/role': { text: 'lead', experience: 'potential-to-develop' } }] },
    { and: [{ status: { code: 'open' } }, { 'skill/role': { text: 'senior', experience: 'potential-to-develop' } }] },
    { and: [{ status: { code: 'open' } }, { organization: { term: 'One Firefly' } }] },
    { and: [{ status: { code: 'open' } }, { compensationrange: { minAmount: 81, maxAmount: 200, currency: 'USD$', periodicity: 'hourly' } }] }
  ]

  each(data, (item, callback) => search(item, null, test, callback), allDone)
}

export default fillTestSearches
