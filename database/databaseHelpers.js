import sqlite3 from "sqlite3";
import { unixToDatetimeFunction, getDaysSinceLastMessage } from '../functions/timeFunctions.js'

const DATABASE_PATH = "./QuickQ.db"

var databaseInstance;

let sql;

export function openDatabase() {
    if (databaseInstance == null) {
        databaseInstance = new sqlite3.Database(DATABASE_PATH, sqlite3.OPEN_READWRITE, (err) => {
                if (err) return console.error(err.message);
            }
        );
    }
    return databaseInstance;
}

export function closeDatabase() {
    if (databaseInstance != null) {
        databaseInstance.close((err) => {
                if (err) return console.error(err.message);
            }
        );
        databaseInstance = null;
    }
}

export async function getAll(query, params = []) {
    let db = openDatabase();

    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            closeDatabase();
            if (err) { reject(err); }
            else { resolve(rows); }
        })
    })    
}

export async function getSingle(query, params = []) {
    let db = openDatabase();

    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            closeDatabase();
            if (err) { reject(err); }
            else { resolve(row); }
        })
    })    
}

export async function runQuery(query, params = []) {
    let db = openDatabase();

    let queryPromise = new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            closeDatabase();
            if (err) { reject(err); }
            else { resolve(true); }
        })
    })

    let success = true;
    queryPromise.then(
        function(value) { /* code if successful */ },
        function(error) { success = false; }
    );
    return success;
}

      // ---------------- INSERT NEW Server INTO DB ------------------
export async function addServer(ownerID, serverID, channelList, membership, inactivityTime) {
    let db = openDatabase();
    var today = new Date().toLocaleDateString();
    // today = unixToDatetimeFunction(today)
    sql = `INSERT INTO servers(ownerID, serverID, channels, membership, inactivityTime, channelsLastChanged) VALUES (?,?,?,?,?,?)`;
    db.run(
        sql,
        [
            ownerID,
            serverID,
            channelList,
            membership,
            inactivityTime,
            today,
        ],
        (err) => {
            if (err) return false;
            else return true;
        }
    );
    closeDatabase();
}

export async function addUser(userID, username, membership, servers) {
    let db = openDatabase();
    // today = unixToDatetimeFunction(today)
    sql = `INSERT INTO users (userID, username, membership, servers) VALUES (?,?,?,?)`;
    db.run(
        sql,
        [
            userID,
            username,
            membership,
            servers
        ],
        (err) => {
            if (err) return false;
            else return true;
        }
    );
    console.log(`User ${userID} added.`)
    closeDatabase();
}

export async function updateUser(userID, username, membership, servers) {
    let db = openDatabase();
    sql = `UPDATE users SET membership = ?, username = ?, servers = ? WHERE userID = ?`;
    db.run(
        sql,
        [
            membership,
            username,
            servers,
            userID,
        ],
        (err) => {
            if (err) return false;
            else return true;
        }
    );
    closeDatabase();
}

export async function updateServer(channelList, serverID, membership, daysInactive) {
    let db = openDatabase();
    var today = new Date().toLocaleDateString();
    sql = `UPDATE servers SET channels = ?, channelsLastChanged = ?, membership = ?, inactivityTime = ?  WHERE serverID = ?`;
    db.run(
        sql,
        [
            channelList,
            today,
            membership,
            daysInactive,
            serverID
        ],
        (err) => {
            if (err) return false;
            else return true;
        }
    );
    console.log(`Channels for ${serverID} updated.`)
    closeDatabase();
}
