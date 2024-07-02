const express = require('express');
const router = express.Router();
const connection = require('./db');


// Book Routes
router.get('/', (req, res) => {
    res.render('home');
    
});
// Book Routes
router.get('/books', (req, res) => {
    connection.query('SELECT * FROM Book', (error, results) => {
        if (error) throw error;
        res.render('books', { books: results });
    });
});

// Route to render the add-book form
router.get('/add-book', (req, res) => {
    res.render('add-book');
});

// Route to handle the POST request to add a new book
router.post('/add-book', (req, res) => {
    const { Title, Author, ISBN, Genre, Publisher, Year } = req.body;
    const query = 'INSERT INTO Book (Title, Author, ISBN, Genre, Publisher, Year) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [Title, Author, ISBN, Genre, Publisher, Year], (error, results) => {
        if (error) {
            console.error('Error adding book:', error);
            res.status(500).json({ error: 'Error adding book' }); // Respond with an error status
            return; // Exit early to avoid further execution
        }
        
        console.log('Book added successfully:', results);
        res.redirect('/api/books'); // Redirect to books page after adding book
    });
});



// Patron Routes
router.get('/patrons', (req, res) => {
    connection.query('SELECT * FROM Patron', (error, results) => {
        if (error) throw error;
        res.render('patrons', { patrons: results }); 
    });
});

// GET route to render the add-patron form
router.get('/add-patron', (req, res) => {
    res.render('add-patron');
});

// POST route to handle adding a new patron
router.post('/add-patron', (req, res) => {
    const { Name, Address, ContactInfo, MembershipID } = req.body;
    const query = 'INSERT INTO Patron (Name, Address, ContactInfo, MembershipID) VALUES (?, ?, ?, ?)';
    connection.query(query, [Name, Address, ContactInfo, MembershipID], (error, results) => {
        if (error) {
            console.error('Error adding patron:', error);
            res.status(500).json({ error: 'Error adding patron' }); // Respond with an error status
            return; // Exit early to avoid further execution
        }
        console.log('Patron added successfully:', results);
        res.redirect('/api/patrons'); // Redirect to patrons page after adding patron
    });
});

// Route to render edit patron form
router.get('/edit-patron/:id', (req, res) => {
    const patronId = req.params.id;
    const getPatronQuery = 'SELECT * FROM Patron WHERE PatronID = ?';

    connection.query(getPatronQuery, [patronId], (error, results) => {
        if (error) {
            console.error('Error fetching patron:', error);
            res.status(500).json({ error: 'Error fetching patron' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Patron not found' });
            return;
        }

        // Render the edit form with fetched data
        res.render('edit-patron', { patron: results[0] });
    });
});

// Route to handle editing a patron
router.post('/edit-patron/:id', (req, res) => {
    const patronId = req.params.id;
    const { Name, Address, ContactInfo, MembershipID } = req.body;
    const updatePatronQuery = 'UPDATE Patron SET Name = ?, Address = ?, ContactInfo = ?, MembershipID = ? WHERE PatronID = ?';

    connection.query(updatePatronQuery, [Name, Address, ContactInfo, MembershipID, patronId], (error, results) => {
        if (error) {
            console.error('Error updating patron:', error);
            res.status(500).json({ error: 'Error updating patron' });
            return;
        }

        console.log('Patron updated successfully:', results);
        res.redirect('/api/patrons'); // Redirect to patrons page after update
    });
});


// Route to handle deleting a patron
router.post('/delete-patron/:id', (req, res) => {
    const patronId = req.params.id;

    // First, delete related borrowing records
    const deleteBorrowingsQuery = 'DELETE FROM Borrowing WHERE PatronID = ?';
    connection.query(deleteBorrowingsQuery, [patronId], (error, results) => {
        if (error) {
            console.error('Error deleting borrowing records:', error);
            res.status(500).json({ error: 'Error deleting borrowing records' });
            return;
        }

        // Then, delete the patron itself
        const deletePatronQuery = 'DELETE FROM Patron WHERE PatronID = ?';
        connection.query(deletePatronQuery, [patronId], (error, results) => {
            if (error) {
                console.error('Error deleting patron:', error);
                res.status(500).json({ error: 'Error deleting patron' });
                return;
            }

            console.log('Patron deleted successfully');
            res.redirect('/api/patrons'); // Redirect to patrons page after deletion
        });
    });
});



// Borrowing Routes
router.get('/borrowings', (req, res) => {
    const query = `
        SELECT Borrowing.BorrowingID, DATE_FORMAT(Borrowing.BorrowDate, '%a %b %d %Y') AS BorrowDateFormatted,
               DATE_FORMAT(Borrowing.ReturnDate, '%a %b %d %Y') AS ReturnDateFormatted,
               Book.Title AS BookTitle, Patron.Name AS PatronName
        FROM Borrowing
        JOIN Book ON Borrowing.BookID = Book.BookID
        JOIN Patron ON Borrowing.PatronID = Patron.PatronID`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.render('borrowing', { borrowings: results });
    });
});

// Route to render the add loan book form
router.get('/add-loan', (req, res) => {
    // Fetch books and patrons to populate dropdowns
    const booksQuery = 'SELECT * FROM Book';
    const patronsQuery = 'SELECT * FROM Patron';

    // Execute both queries in parallel
    connection.query(booksQuery, (error1, books) => {
        if (error1) throw error1;
        
        connection.query(patronsQuery, (error2, patrons) => {
            if (error2) throw error2;
            
            res.render('add-newloanbook', { books, patrons });
        });
    });
});

// Route to handle the POST request to add a new loan book
router.post('/add-loan', (req, res) => {
    const { BorrowDate, ReturnDate, PatronID, BookID } = req.body;
    const query = 'INSERT INTO Borrowing (BorrowDate, ReturnDate, PatronID, BookID) VALUES (?, ?, ?, ?)';
    connection.query(query, [BorrowDate, ReturnDate, PatronID, BookID], (error, results) => {
        if (error) {
            console.error('Error adding loan book:', error);
            res.status(500).json({ error: 'Error adding loan book' }); // Respond with an error status
            return; // Exit early to avoid further execution
        }
        console.log('Loan book added successfully:', results);
        res.redirect('/api/borrowings'); // Redirect to borrowings page after adding loan book
    });
});


// Route to render edit loan book form
router.get('/edit-loan/:id', (req, res) => {
    const borrowingId = req.params.id;
    const getBorrowingQuery = `
        SELECT Borrowing.BorrowingID, Borrowing.BorrowDate, Borrowing.ReturnDate, Borrowing.PatronID, Borrowing.BookID,
               Book.Title AS BookTitle, Patron.Name AS PatronName
        FROM Borrowing
        JOIN Book ON Borrowing.BookID = Book.BookID
        JOIN Patron ON Borrowing.PatronID = Patron.PatronID
        WHERE Borrowing.BorrowingID = ?`;

    connection.query(getBorrowingQuery, [borrowingId], (error, results) => {
        if (error) {
            console.error('Error fetching loan book:', error);
            res.status(500).json({ error: 'Error fetching loan book' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Loan book not found' });
            return;
        }

        const booksQuery = 'SELECT * FROM Book';
        const patronsQuery = 'SELECT * FROM Patron';

        connection.query(booksQuery, (error1, books) => {
            if (error1) throw error1;
            
            connection.query(patronsQuery, (error2, patrons) => {
                if (error2) throw error2;
                
                res.render('edit-loan', { borrowing: results[0], books, patrons });
            });
        });
    });
});


//Route to handle the POST request to update a loan book
router.post('/edit-loan/:id', (req, res) => {
    const borrowingId = req.params.id;
    const { BorrowDate, ReturnDate, PatronID, BookID } = req.body;
    const updateQuery = `
        UPDATE Borrowing
        SET BorrowDate = ?, ReturnDate = ?, PatronID = ?, BookID = ?
        WHERE BorrowingID = ?`;

    connection.query(updateQuery, [BorrowDate, ReturnDate, PatronID, BookID, borrowingId], (error, results) => {
        if (error) {
            console.error('Error updating loan book:', error);
            res.status(500).json({ error: 'Error updating loan book' });
            return;
        }

        console.log('Loan book updated successfully:', results);
        res.redirect('/api/borrowings'); // Redirect to borrowings page after updating loan book
    });
});

// Route to delete a loan book using POST method
router.post('/delete-loan', (req, res) => {
    const borrowingId = req.body.borrowing_id;
    const deleteQuery = 'DELETE FROM Borrowing WHERE BorrowingID = ?';

    connection.query(deleteQuery, [borrowingId], (error, results) => {
        if (error) {
            console.error('Error deleting loan book:', error);
            res.status(500).json({ error: 'Error deleting loan book' });
            return;
        }

        console.log('Loan book deleted successfully:', results);
        res.redirect('/api/borrowings'); // Redirect to borrowings page after deletion
    });
});





// Staff Routes
router.get('/staff', (req, res) => {
    connection.query('SELECT * FROM Staff', (error, results) => {
        if (error) throw error;
        res.render('staff', { staff: results });
    });
});


// Route to render the add staff form
router.get('/add-staff', (req, res) => {
    res.render('add-staff');
});

// Route to handle the POST request to add a new staff member
router.post('/add-staff', (req, res) => {
    const { Name, Position, ContactInfo } = req.body;
    const query = 'INSERT INTO Staff (Name, Position, ContactInfo) VALUES (?, ?, ?)';
    connection.query(query, [Name, Position, ContactInfo], (error, results) => {
        if (error) {
            console.error('Error adding staff member:', error);
            res.status(500).json({ error: 'Error adding staff member' });
            return;
        }
        console.log('Staff member added successfully:', results);
        res.redirect('/api/staff');
    });
});


// Route to render the edit staff form
router.get('/edit-staff/:id', (req, res) => {
    const staffId = req.params.id;
    const getStaffQuery = 'SELECT * FROM Staff WHERE StaffID = ?';

    connection.query(getStaffQuery, [staffId], (error, results) => {
        if (error) {
            console.error('Error fetching staff details:', error);
            res.status(500).json({ error: 'Error fetching staff details' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Staff member not found' });
            return;
        }

        res.render('edit-staff', { staffMember: results[0] });
    });
});

// Route to handle the POST request to update staff details
router.post('/edit-staff/:id', (req, res) => {
    const staffId = req.params.id;
    const { Name, Position, ContactInfo } = req.body;
    const updateQuery = 'UPDATE Staff SET Name = ?, Position = ?, ContactInfo = ? WHERE StaffID = ?';

    connection.query(updateQuery, [Name, Position, ContactInfo, staffId], (error, results) => {
        if (error) {
            console.error('Error updating staff details:', error);
            res.status(500).json({ error: 'Error updating staff details' });
            return;
        }

        console.log('Staff details updated successfully:', results);
        res.redirect('/api/staff');
    });
});

// Route to delete a staff member
router.post('/delete-staff/:id', (req, res) => {
    const staffId = req.params.id;
    const deleteQuery = 'DELETE FROM Staff WHERE StaffID = ?';

    connection.query(deleteQuery, [staffId], (error, results) => {
        if (error) {
            console.error('Error deleting staff member:', error);
            res.status(500).json({ error: 'Error deleting staff member' });
            return;
        }
        res.redirect('/api/staff'); // Redirect to the staff list page after deletion
    });
});




module.exports = router;
