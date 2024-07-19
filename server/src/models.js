const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  Title: String,
  Author: String,
  ISBN: String,
  Genre: String,
  Publisher: String,
  Year: Number
});

const patronSchema = new Schema({
  Name: String,
  Address: String,
  ContactInfo: String,
  MembershipID: String
});

const borrowingSchema = new mongoose.Schema({
  PatronID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patron', required: true },
  BookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  BorrowDate: { type: Date, required: true },
  ReturnDate: { type: Date, required: true },
});


const staffSchema = new Schema({
  Name: String,
  Position: String,
  ContactInfo: String
});

const Book = mongoose.model('Book', bookSchema);
const Patron = mongoose.model('Patron', patronSchema);
const Borrowing = mongoose.model('Borrowing', borrowingSchema);
const Staff = mongoose.model('Staff', staffSchema);

module.exports = { Book, Patron, Borrowing, Staff };
