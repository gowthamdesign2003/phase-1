const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  

    res.sendFile(path.join(__dirname, 'one.html'));
    // res.send(`
    //     <h2>Contact Form</h2>
    //     <form method="POST" action="/submit">
    //       <label>Name:</label><br/>
    //       <input type="text" name="name" /><br/><br/>
          
    //       <label>Email:</label><br/>
    //       <input type="email" name="email" /><br/><br/>
          
    //       <label>Message:</label><br/>
    //       <textarea name="message"></textarea><br/><br/>
          
    //       <button type="submit">Submit</button>
    //     </form>
    // `)

  
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.send(`
      <h3>Error</h3>
      <p>All fields are required. Please go back and fill in all fields.</p>
    `);
  }

  res.send(`
    <h2>Form Submitted Successfully!</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
