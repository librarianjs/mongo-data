const assert = require('assert')
const MongoData = require('../')

const UUID_REGEX = /[\w]{8}(-[\w]{4}){3}-[\w]{12}/
const TEST_KEY = 'test-key'
const FAKE_KEY = 'fake-key'

describe('MongoData', function(){
  let record = {
    id: TEST_KEY,
    name: 'cats.png',
    size: 4444,
    mimeType: 'image/png'
  }
  let plugin

  before(() => {
    plugin = new MongoData({
      host: 'localhost:27017',
      database: 'mocha',
      collection: 'test_files'
    })
  })
  after(async () => {
    let c = await plugin._collection()
    await c.drop()
  })

  it('should init() successfully', () => {
    return plugin.init()
  })

  it('should put() successfully', () => {
    return plugin.put(record)
  })

  it('should get() successfully', () => {
    return plugin.get(TEST_KEY).then(fetched => {
      assert.deepEqual(record, fetched)
    })
  })

  it('should getAll() successfully', () => {
    return plugin.getAll().then(fetched => {
      assert(Array.isArray(fetched), 'Returned data is not in array form')
      assert(typeof fetched[0] !== 'object', 'Returned records are objects')
    })
  })

  it('should return null for a missing key', () => {
    return plugin.get(FAKE_KEY).then(data => {
      assert.equal(data, null)
    })
  })
})
