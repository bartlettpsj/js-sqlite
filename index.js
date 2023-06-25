const sqlite3 = require('sqlite3').verbose();

// this uses callbacks - yuk!

const db = new sqlite3.Database('./paul.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the paul database.');

        const createQuery = 'CREATE TABLE PAUL ( id NUMBER , name VARCHAR(100 ));';

        db.run(createQuery, (err) => {

            if (err) {
                console.error(err.message);
            } else {
                console.log('Table created');
            }

            const insertQuery = "insert into PAUL (id, name) values (1, 'Paul'); ";

            db.run(insertQuery, (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Row added to database');
                }
            });

            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                } else {
                    console.log('Close the database connection.');
                }
            });
        });


    }
});


