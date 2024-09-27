
const express = require('express');
const app = express();
const db = require('./db/');
const cors = require('cors');



app.use(cors());
app.use(express.json());
// ! Routing to home page
app.get('/homes', async (req, res) => {
    try {
        const users = await db.select('*').from('users');
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server error');
    }
});

// ! routing to user page (this will be same as the home page)
app.get('/home/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db('users').where('id', id).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

// ! routing to notes page
app.get('/home/:id/notes/', async (req, res) => {
    try {
      const id = req.params.id;
  
      // Step 1: Fetch the account status from account table
    const user = await db('users')
        .join('account', 'users.acc_id', 'account.account_id')
        .select('account.account_status')
        .where('users.id', id)
        .first(); // Only fetch one record, since ID should be unique
      // Check if user exists and has an account status
      if (!user || user.account_status === undefined) {
        return res.status(404).json({ message: 'User or Account not found' });
      }
  
      const { account_status } = user;
  
      // Step 2: If account status is true, fetch the notes
      if (account_status) {
        const notes = await db('notes')
          .where('user_id', id) // Assuming user_id references the user in notes table
          .select('*'); // Adjust the columns you want to fetch
  
        // Step 3: Return the notes as a response
        return res.status(200).json({ notes });
      } else {
        // If account status is false
        return res.status(403).json({ message: 'Account is inactive' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
app.all('/home/:id/notes/:notesId', async (req, res) => {
    const id = req.params.id;
    const notesId = req.params.notesId;

    try {
        if (req.method === 'PUT') {
            const { title, text } = req.body;

            // Update the note in the database
            const updatedRows = await db('notes')
                .where({
                    note_id: notesId
                })
                .update({
                    title: title,
                    text: text
                });

            if (updatedRows === 0) {
                return res.status(404).json({ message: 'Note not found' });
            }

            res.status(200).json({ message: 'Note updated successfully' });

        } else if (req.method === 'DELETE') {
            // Delete the note from the database
            const deletedRows = await db('notes')
                .where({
                    note_id: notesId
                })
                .del();

            if (deletedRows === 0) {
                return res.status(404).json({ message: 'Note not found' });
            }

            res.status(200).json({ message: 'Note deleted successfully' });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/home/:id/notes/post', async (req, res)=>{
    const {title, text} = req.body;
    try {
        const newNote = await db('notes').insert({
            title: title,
            text: text,
            user_id: req.params.id
        });
        res.status(200).json({message: 'Note created successfully'});
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

//  * listening 
app.listen(3009, () => {
    console.log('Server is running on port 3009');
});
