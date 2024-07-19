const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { Book, Patron, Borrowing, Staff } = require('./models');

// Home route
router.get('/', (req, res) => {
  res.render('home');
});

// Book routes
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('books', { books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

router.get('/add-book', (req, res) => {
  res.render('add-book');
});

router.post('/add-book', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect('/api/books');
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Error adding book' });
  }
});

router.get('/edit-book/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.render('edit-book', { book });
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ error: 'Error fetching book' });
    }
  });
  router.post('/edit-book/:id', async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/api/books');
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Error updating book' });
    }
  });
  router.post('/delete-book/:id', async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.redirect('/api/books');
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Error deleting book' });
    }
  });
      

// Patron routes
router.get('/patrons', async (req, res) => {
  try {
    const patrons = await Patron.find();
    res.render('patrons', { patrons });
  } catch (error) {
    console.error('Error fetching patrons:', error);
    res.status(500).json({ error: 'Error fetching patrons' });
  }
});

router.get('/add-patron', (req, res) => {
  res.render('add-patron');
});

router.post('/add-patron', async (req, res) => {
  try {
    const newPatron = new Patron(req.body);
    await newPatron.save();
    res.redirect('/api/patrons');
  } catch (error) {
    console.error('Error adding patron:', error);
    res.status(500).json({ error: 'Error adding patron' });
  }
});

router.get('/edit-patron/:id', async (req, res) => {
  try {
    const patron = await Patron.findById(req.params.id);
    if (!patron) {
      res.status(404).json({ error: 'Patron not found' });
      return;
    }
    res.render('edit-patron', { patron });
  } catch (error) {
    console.error('Error fetching patron:', error);
    res.status(500).json({ error: 'Error fetching patron' });
  }
});

router.post('/edit-patron/:id', async (req, res) => {
  try {
    await Patron.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/api/patrons');
  } catch (error) {
    console.error('Error updating patron:', error);
    res.status(500).json({ error: 'Error updating patron' });
  }
});

router.post('/delete-patron/:id', async (req, res) => {
  try {
    await Borrowing.deleteMany({ PatronID: req.params.id });
    await Patron.findByIdAndDelete(req.params.id);
    res.redirect('/api/patrons');
  } catch (error) {
    console.error('Error deleting patron:', error);
    res.status(500).json({ error: 'Error deleting patron' });
  }
});

// Borrowing routes

// Get all borrowings
router.get('/borrowings', async (req, res) => {
  try {
    const borrowings = await Borrowing.find()
      .populate('BookID', 'Title')
      .populate('PatronID', 'Name');
    res.render('borrowing', { borrowings });
  } catch (error) {
    console.error('Error fetching borrowings:', error);
    res.status(500).json({ error: 'Error fetching borrowings' });
  }
});

// Render form to add a new loan
router.get('/add-loan', async (req, res) => {
  try {
    const books = await Book.find();
    const patrons = await Patron.find();
    res.render('add-newloanbook', { books, patrons });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Add a new loan
router.post('/add-loan', async (req, res) => {
  try {
    const { PatronID, BookID, BorrowDate, ReturnDate } = req.body;
    const newBorrowing = new Borrowing({
      PatronID: new mongoose.Types.ObjectId(PatronID),
      BookID: new mongoose.Types.ObjectId(BookID),
      BorrowDate,
      ReturnDate,
    });
    await newBorrowing.save();
    res.redirect('/api/borrowings');
  } catch (error) {
    console.error('Error adding loan book:', error);
    res.status(500).json({ error: 'Error adding loan book' });
  }
});

// Render form to edit a loan
router.get('/edit-loan/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id).populate('BookID').populate('PatronID');
    if (!borrowing) {
      res.status(404).json({ error: 'Loan book not found' });
      return;
    }
    const books = await Book.find();
    const patrons = await Patron.find();
    res.render('edit-loan', { borrowing, books, patrons });
  } catch (error) {
    console.error('Error fetching loan book:', error);
    res.status(500).json({ error: 'Error fetching loan book' });
  }
});

// Update a loan
router.post('/edit-loan/:id', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging line
    const { PatronID, BookID, BorrowDate, ReturnDate } = req.body;
    await Borrowing.findByIdAndUpdate(req.params.id, {
      PatronID: new mongoose.Types.ObjectId(PatronID),
      BookID: new mongoose.Types.ObjectId(BookID),
      BorrowDate,
      ReturnDate,
    });
    res.redirect('/api/borrowings');
  } catch (error) {
    console.error('Error updating loan book:', error);
    res.status(500).json({ error: 'Error updating loan book' });
  }
});

// Delete a loan
router.post('/delete-loan/:id', async (req, res) => {
  try {
    await Borrowing.findByIdAndDelete(req.params.id);
    res.redirect('/api/borrowings');
  } catch (error) {
    console.error('Error deleting loan book:', error);
    res.status(500).json({ error: 'Error deleting loan book' });
  }
});


// Staff routes
router.get('/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.render('staff', { staff });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Error fetching staff' });
  }
});

router.get('/add-staff', (req, res) => {
  res.render('add-staff');
});

router.post('/add-staff', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.redirect('/api/staff');
  } catch (error) {
    console.error('Error adding staff member:', error);
    res.status(500).json({ error: 'Error adding staff member' });
  }
});

router.get('/edit-staff/:id', async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);
    if (!staffMember) {
      res.status(404).json({ error: 'Staff member not found' });
      return;
    }
    res.render('edit-staff', { staffMember });
  } catch (error) {
    console.error('Error fetching staff details:', error);
    res.status(500).json({ error: 'Error fetching staff details' });
  }
});

router.post('/edit-staff/:id', async (req, res) => {
  try {
    await Staff.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/api/staff');
  } catch (error) {
    console.error('Error updating staff details:', error);
    res.status(500).json({ error: 'Error updating staff details' });
  }
});

router.post('/delete-staff/:id', async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.redirect('/api/staff');
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ error: 'Error deleting staff member' });
  }
});

module.exports = router;
