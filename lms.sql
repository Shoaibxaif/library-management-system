CREATE DATABASE LibraryManagementSystem;
use LibraryManagementSystem;

CREATE TABLE Book (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    Author VARCHAR(255),
    ISBN VARCHAR(13),
    Genre VARCHAR(50),
    Publisher VARCHAR(100),
    Year INT
);

INSERT INTO Book (Title, Author, ISBN, Genre, Publisher, Year) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Fiction', 'Scribner', 1925),
('1984', 'George Orwell', '9780451524935', 'Dystopian', 'Plume', 1949),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 'Fiction', 'J.B. Lippincott & Co.', 1960),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', 'Fiction', 'Little, Brown and Company', 1951),
('Pride and Prejudice', 'Jane Austen', '9780192833554', 'Romance', 'T. Egerton', 1813),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 'Fantasy', 'George Allen & Unwin', 1937),
('Moby Dick', 'Herman Melville', '9781503280786', 'Adventure', 'Harper & Brothers', 1851),
('War and Peace', 'Leo Tolstoy', '9781400079988', 'Historical', 'The Russian Messenger', 1869),
('The Odyssey', 'Homer', '9780140268867', 'Epic', 'Penguin Classics', -800),
('Great Expectations', 'Charles Dickens', '9780141439563', 'Fiction', 'Chapman & Hall', 1861),
('Ulysses', 'James Joyce', '9780199535675', 'Modernist', 'Sylvia Beach', 1922),
('The Divine Comedy', 'Dante Alighieri', '9780140448955', 'Epic', 'Penguin Classics', 1320),
('Brave New World', 'Aldous Huxley', '9780060850524', 'Dystopian', 'Chatto & Windus', 1932),
('The Brothers Karamazov', 'Fyodor Dostoevsky', '9780374528379', 'Philosophical', 'The Russian Messenger', 1880),
('Crime and Punishment', 'Fyodor Dostoevsky', '9780140449136', 'Philosophical', 'The Russian Messenger', 1866),
('Anna Karenina', 'Leo Tolstoy', '9780143035008', 'Romance', 'The Russian Messenger', 1877),
('Jane Eyre', 'Charlotte Brontë', '9780141441146', 'Romance', 'Smith, Elder & Co.', 1847),
('Wuthering Heights', 'Emily Brontë', '9780141439556', 'Gothic', 'Thomas Cautley Newby', 1847),
('The Count of Monte Cristo', 'Alexandre Dumas', '9780140449266', 'Adventure', 'Penguin Classics', 1844),
('A Tale of Two Cities', 'Charles Dickens', '9780141439600', 'Historical', 'Chapman & Hall', 1859),
('Les Misérables', 'Victor Hugo', '9780451419439', 'Historical', 'A. Lacroix, Verboeckhoven & Cie', 1862),
('Don Quixote', 'Miguel de Cervantes', '9780060934347', 'Adventure', 'Francisco de Robles', 1615),
('The Iliad', 'Homer', '9780140275360', 'Epic', 'Penguin Classics', -750),
('Madame Bovary', 'Gustave Flaubert', '9780140449129', 'Fiction', 'Penguin Classics', 1856),
('The Stranger', 'Albert Camus', '9780679720201', 'Philosophical', 'Gallimard', 1942),
('The Picture of Dorian Gray', 'Oscar Wilde', '9780141439570', 'Gothic', 'Ward, Lock & Co.', 1890),
('Dracula', 'Bram Stoker', '9780141439846', 'Gothic', 'Archibald Constable and Company', 1897),
('Frankenstein', 'Mary Shelley', '9780141439471', 'Gothic', 'Lackington, Hughes, Harding, Mavor & Jones', 1818),
('The Lord of the Rings', 'J.R.R. Tolkien', '9780544003415', 'Fantasy', 'George Allen & Unwin', 1954),
('One Hundred Years of Solitude', 'Gabriel García Márquez', '9780060883287', 'Magic Realism', 'Harper & Row', 1967),
('Fahrenheit 451', 'Ray Bradbury', '9781451673319', 'Dystopian', 'Ballantine Books', 1953);

CREATE TABLE Patron (
    PatronID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Address TEXT,
    ContactInfo VARCHAR(100),
    MembershipID VARCHAR(50)
);

INSERT INTO Patron (Name, Address, ContactInfo, MembershipID) VALUES
('John Doe', '123 Elm Street, Springfield, IL', 'john.doe@example.com', 'M001'),
('Jane Smith', '456 Oak Avenue, Springfield, IL', 'jane.smith@example.com', 'M002'),
('Alice Johnson', '789 Pine Road, Springfield, IL', 'alice.johnson@example.com', 'M003'),
('Bob Brown', '101 Maple Lane, Springfield, IL', 'bob.brown@example.com', 'M004'),
('Charlie Davis', '202 Birch Boulevard, Springfield, IL', 'charlie.davis@example.com', 'M005'),
('Diana Evans', '303 Cedar Court, Springfield, IL', 'diana.evans@example.com', 'M006'),
('Evan Garcia', '404 Fir Drive, Springfield, IL', 'evan.garcia@example.com', 'M007'),
('Fiona Harris', '505 Spruce Terrace, Springfield, IL', 'fiona.harris@example.com', 'M008'),
('George Jackson', '606 Walnut Street, Springfield, IL', 'george.jackson@example.com', 'M009'),
('Hannah King', '707 Poplar Circle, Springfield, IL', 'hannah.king@example.com', 'M010'),
('Ian Lewis', '808 Willow Way, Springfield, IL', 'ian.lewis@example.com', 'M011'),
('Jack Martin', '909 Ash Place, Springfield, IL', 'jack.martin@example.com', 'M012'),
('Kelly Nelson', '1010 Hickory Street, Springfield, IL', 'kelly.nelson@example.com', 'M013'),
('Liam Brien', '1111 Sycamore Lane, Springfield, IL', 'liam.obrien@example.com', 'M014'),
('Mia Parker', '1212 Redwood Road, Springfield, IL', 'mia.parker@example.com', 'M015'),
('Noah Quinn', '1313 Chestnut Drive, Springfield, IL', 'noah.quinn@example.com', 'M016'),
('Olivia Roberts', '1414 Hemlock Avenue, Springfield, IL', 'olivia.roberts@example.com', 'M017'),
('Paul Scott', '1515 Dogwood Boulevard, Springfield, IL', 'paul.scott@example.com', 'M018'),
('Quinn Taylor', '1616 Laurel Lane, Springfield, IL', 'quinn.taylor@example.com', 'M019'),
('Rachel Wilson', '1717 Magnolia Court, Springfield, IL', 'rachel.wilson@example.com', 'M020');

CREATE TABLE Borrowing (
    BorrowingID INT PRIMARY KEY AUTO_INCREMENT,
    BorrowDate DATE,
    ReturnDate DATE,
    PatronID INT,
    BookID INT,
    FOREIGN KEY (PatronID) REFERENCES Patron(PatronID),
    FOREIGN KEY (BookID) REFERENCES Book(BookID)
);

INSERT INTO Borrowing (BorrowDate, ReturnDate, PatronID, BookID) VALUES
('2024-01-01', '2024-01-15', 1, 5),
('2024-01-02', '2024-01-16', 2, 6),
('2024-01-03', '2024-01-17', 3, 7),
('2024-01-04', '2024-01-18', 4, 8),
('2024-01-05', '2024-01-19', 5, 9),
('2024-01-06', '2024-01-20', 6, 10),
('2024-01-07', '2024-01-21', 7, 11),
('2024-01-08', '2024-01-22', 8, 12),
('2024-01-09', '2024-01-23', 9, 13),
('2024-01-10', '2024-01-24', 10, 14);


CREATE TABLE Staff (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Position VARCHAR(50),
    ContactInfo VARCHAR(100)
);

INSERT INTO Staff (Name, Position, ContactInfo) VALUES
('Anna Wilson', 'Librarian', 'anna.wilson@example.com'),
('Ben Johnson', 'Assistant Librarian', 'ben.johnson@example.com'),
('Clara Smith', 'Library Technician', 'clara.smith@example.com'),
('David Brown', 'Library Assistant', 'david.brown@example.com'),
('Ella Davis', 'Archivist', 'ella.davis@example.com'),
('Frank Miller', 'Library Page', 'frank.miller@example.com'),
('Grace Lee', 'Cataloger', 'grace.lee@example.com'),
('Hannah White', 'Reference Librarian', 'hannah.white@example.com'),
('Isaac Hall', 'Library Clerk', 'isaac.hall@example.com'),
('Julia Clark', 'Library Director', 'julia.clark@example.com');