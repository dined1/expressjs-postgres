import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT tadoushi, jidoushi FROM tajiverb");
//   res.send(`${rows[0].tadoushi} - ${rows[0].jidoushi}`);
  res.render('ind', {
      subject: 'hbs template engine',
      name: 'our template',
      link: 'https://google.com'
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
