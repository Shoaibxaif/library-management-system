
```markdown
# Library Management System API Documentation

This documentation provides details on how to use the Library Management System API.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- MySQL
- Postman (for testing API endpoints)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
   cd repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_DATABASE=LibraryManagementSystem
     ```

4. Import the database schema:
   - Use the provided SQL schema (`library_schema.sql`) to set up your MySQL database.

5. Start the server:
   ```bash
   npm start
   ```

6. Verify the server is running by visiting `http://localhost:3000` in your browser.

## API Endpoints

### Home

- **GET** `/`
  - Retrieves the count of books in the library.

### Books

- **GET** `/api/books`
  - Retrieves all books.
  
- **POST** `/api/books`
  - Adds a new book to the database.

  Example request body:
  ```json
  {
    "Title": "Book Title",
    "Author": "Book Author",
    "ISBN": "1234567890123",
    "Genre": "Fiction",
    "Publisher": "Publisher Name",
    "Year": 2023
  }
  ```

### Patrons

- **GET** `/api/patrons`
  - Retrieves all patrons.
  
- **POST** `/api/patrons`
  - Adds a new patron to the database.

  Example request body:
  ```json
  {
    "Name": "Patron Name",
    "Address": "Patron Address",
    "ContactInfo": "Patron Contact Info",
    "MembershipID": "ABC123"
  }
  ```

### Borrowings

- **GET** `/api/borrowings`
  - Retrieves all borrowings with formatted dates.
  
- **POST** `/api/borrowings`
  - Records a new borrowing in the database.

  Example request body:
  ```json
  {
    "BorrowDate": "2023-06-30",
    "ReturnDate": "2023-07-15",
    "PatronID": 1,
    "BookID": 1
  }
  ```

### Staff

- **GET** `/api/staff`
  - Retrieves all staff members.
  
- **POST** `/api/staff`
  - Adds a new staff member to the database.

  Example request body:
  ```json
  {
    "Name": "Staff Name",
    "Position": "Staff Position",
    "ContactInfo": "Staff Contact Info"
  }
  ```

## Testing with Postman

1. Open Postman and import the provided Postman collection (`LibraryManagementSystem.postman_collection.json`).

2. Test each endpoint with appropriate request bodies.

## Troubleshooting

- If you encounter any issues, ensure your database connection details in the `.env` file are correct.
- Check console logs for any server-side errors.

## Contributing

- Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
```

### Files to Include in Your Repository:

1. **library_schema.sql**: SQL file containing the database schema.
2. **.env**: Environment file with database connection details (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`).
3. **LibraryManagementSystem.postman_collection.json**: Postman collection for testing API endpoints.

This template provides a structured overview of your API and includes steps for setup, usage, testing with Postman, troubleshooting tips, and guidelines for contributing. Adjust it according to your specific API details and repository structure.
