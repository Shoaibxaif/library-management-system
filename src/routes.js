const express = require('express');
const router = express.Router();
const connection = require('./db');

// Book Routes

router.get('/books', (req, res) => {
    connection.query('SELECT * FROM Book', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/books', (req, res) => {
    const { Title, Author, ISBN, Genre, Publisher, Year } = req.body;
    const query = 'INSERT INTO Book (Title, Author, ISBN, Genre, Publisher, Year) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [Title, Author, ISBN, Genre, Publisher, Year], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Patron Routes
router.get('/patrons', (req, res) => {
    connection.query('SELECT * FROM Patron', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/patrons', (req, res) => {
    const { Name, Address, ContactInfo, MembershipID } = req.body;
    const query = 'INSERT INTO Patron (Name, Address, ContactInfo, MembershipID) VALUES (?, ?, ?, ?)';
    connection.query(query, [Name, Address, ContactInfo, MembershipID], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Borrowing Routes
router.get('/borrowings', (req, res) => {
    const query = `
        SELECT Borrowing.BorrowingID, Borrowing.BorrowDate, Borrowing.ReturnDate, 
               Book.Title AS BookTitle, Patron.Name AS PatronName
        FROM Borrowing
        JOIN Book ON Borrowing.BookID = Book.BookID
        JOIN Patron ON Borrowing.PatronID = Patron.PatronID`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/borrowings', (req, res) => {
    const { BorrowDate, ReturnDate, PatronID, BookID } = req.body;
    const query = 'INSERT INTO Borrowing (BorrowDate, ReturnDate, PatronID, BookID) VALUES (?, ?, ?, ?)';
    connection.query(query, [BorrowDate, ReturnDate, PatronID, BookID], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Staff Routes
router.get('/staff', (req, res) => {
    connection.query('SELECT * FROM Staff', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/staff', (req, res) => {
    const { Name, Position, ContactInfo } = req.body;
    const query = 'INSERT INTO Staff (Name, Position, ContactInfo) VALUES (?, ?, ?)';
    connection.query(query, [Name, Position, ContactInfo], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;
