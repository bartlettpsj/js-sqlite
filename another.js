const sql3 = require("promised-sqlite3");

console.log('Using Promised SQLITE3');

const main = async () => {
    const db = await sql3.AsyncDatabase.open("./db.sqlite");
    console.log('Database Open');

    await db.run(
        "CREATE TABLE IF NOT EXISTS paul (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, comment TEXT)"
    );
    console.log('Table created');

    await db.run("INSERT INTO paul (name, comment) VALUES (?, ?)", "alpha", "beta");
    await db.run("INSERT INTO paul (name, comment) VALUES ($goo, $hoo)", { $goo: "GOO !", $hoo: "HOO :" });
    await db.run("INSERT INTO paul (name, comment) VALUES (?, ?)", [
        "Value of Name",
        "Value of Comment",
    ]);
    console.log('Rows inserted');

    const rows = await db.all("SELECT * FROM paul");
    await db.each("SELECT * FROM paul WHERE id > ?", 2, (row) =>
      console.log(row)
    );

    // Create a async statement
    // const statement = await db.prepare("SELECT * FROM paul WHERE id < ?", 5);
    // const all = await statement.all();
    // all.forEach(row => console.log('ROW: ', row));
    // await statement.finalize();

    const statement = await db.prepare("SELECT * FROM paul WHERE id < ?");
    await statement.each(4, row => console.log('The Row: ', row));
    await statement.finalize();


    // const row = await statement.get();
    // console.log('Row', row);
    // await statement.close();

    // Close the database.
    await db.close();    
    console.log('Database closed');

}

main();