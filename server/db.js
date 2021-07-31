var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

const remoteDbPassword = config.dbPassword;
const dbUserName = config.dbUserName;
const connectionString = `mongodb+srv://${dbUserName}:${remoteDbPassword}@cluster0.bnttf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

var _db;
var _items;

module.exports = {
    /**
     * connect to the database
     * @returns {Promise<void>}
     */
    connectToDb: async () => {
        try {
            MongoClient.connect(connectionString, { useUnifiedTopology: true } , function(err, client) {
                try {
                    _db = client.db("Todolist");
                    _items = _db.collection("items");
                    console.log('Connected to mongo!!!');
                } catch {
                    console.log("error")
                }
            });
        } catch (err) {
            console.log(`Could not connect to MongoDB (err) => ${err}`);
        }
    },
    connection: connectionString,
    getDb: () => {return _db;},

    /**
     * Check if exist and if not, insert new user object to the database.
     * @param item
     * @returns {Promise<number>}
     */
    addUser: async (item) => {
        console.log(item.userN)
        let query = {userN : item.userN}
        const isExist = await _items.findOne(query)
            // if we find user with the user name that in the query. we will
            // send '515' to the client side.
            if(isExist){
                return 515
            }
            _items.insertOne(item, {}, function (err, doc) {
                if (err) {
                    return 500
                }
            });
            return 200
    },

    /**
     * Insert any kind of an object to the database.
     * @param item
     * @returns {number}
     */
    addItem: (item) => {
        _items.insertOne(item, {}, function (err, doc) {
            if (err) {
                return 500
            }
        });
        return 200
    },

    /**
     * Return to the user all the data that exist in the database and convert it to an array of objects.
     * @param callback
     * @returns {Promise|void|any[]|*}
     */
    getAllItems: (callback) => {
        return _items.find({}).toArray(callback);
    },

    /**
     * Search in the database an object that has the filter (oldquery)
     * and update it with the field that inside the newquery.
     * @param oldQuery
     * @param newQuery
     * @returns {number}
     */
    updateItem: (oldQuery, newQuery) => {
        _items.updateOne(oldQuery, newQuery, function (err, doc) {
            if (err) {
                return 500
            }
        });
        return 200
    },

    /**
     * Return to the user all the records data (objects)
     * that exist in the database and convert it to an array of objects.
     * @param callback
     * @returns {Promise|void|any[]|*}
     */
    getRecordsItems: (callback) => {
        let query = {type : 'new record'}
        return _items.find(query).toArray(callback);
    }
};

