const db = new Database({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'database_name'
});

const profiles = new UserProfiles(db);

db.connect()
    .then(() => profiles.fetchProfiles())
    .then(rows => console.log(rows))
    .catch(err => console.error(err))
    .finally(() => db.close());