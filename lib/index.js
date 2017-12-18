const {MongoClient} = require( 'mongodb' )
const {assign} = Object

module.exports = class MongoData {
  constructor (options) {
    this.options = assign({
      host: 'localhost',
      database: 'librarian',
      collection: 'files',
    }, options)
  }
  async _collection () {
    let {host, database, collection} = this.options
    if (!this.connection) {
      this.connection = await MongoClient.connect(`mongodb://${host}/${database}`)
    }
    return this.connection.collection(collection)
  }
  async get(id) {
    let c = await this._collection()
    return await c.findOne({id}, {_id: 0})
  }
  async put(record) {
    let c = await this._collection()
    await c.insert(assign({}, record))
  }
  async getAll() {
    let c = await this._collection()
    return await c.distinct('id')
  }
}
