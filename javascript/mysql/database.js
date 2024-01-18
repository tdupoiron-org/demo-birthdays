const mysql = require('mysql');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
}

class UserProfiles {
  constructor(database) {
    this.db = database;
  }

  fetchProfiles() {
    return this.db.query('SELECT * FROM users');
  }

  fetchProfileById(id) {
    return this.db.query('SELECT * FROM users WHERE id = ' + id);
  }
}