# Library Management System

This is a simple RESTful API for managing a library system. It allows you to manage books, patrons, borrowing records, and staff.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Shoaibxaif/library-management-system.git
    cd library-management-api
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the database:

    - Create a MySQL database and tables according to your needs.
    - Update the database connection settings in the `db.js` file.

4. Start the server:

    ```sh
    node app.js
    ```

## API Endpoints

### Books

#### Get all books

- **URL**: `/books`
- **Method**: `GET`
- **Success Response**:
    - **Code**: 200
    - **Content**: `[{"BookID": 1, "Title": "Book Title", "Author": "Author Name", ...}]`

#### Add a new book

- **URL**: `/books`
- **Method**: `POST`
- **Body Parameters**:
    - `Title` (string)
    - `Author` (string)
    - `ISBN` (string)
    - `Genre` (string)
    - `Publisher` (string)
    - `Year` (number)
- **Success Response**:
    - **Code**: 200
    - **Content**: `{"affectedRows": 1, ...}`

### Patrons

#### Get all patrons

- **URL**: `/patrons`
- **Method**: `GET`
- **Success Response**:
    - **Code**: 200
    - **Content**: `[{"PatronID": 1, "Name": "Patron Name", ...}]`

#### Add a new patron

- **URL**: `/patrons`
- **Method**: `POST`
- **Body Parameters**:
    - `Name` (string)
    - `Address` (string)
    - `ContactInfo` (string)
    - `MembershipID` (string)
- **Success Response**:
    - **Code**: 200
    - **Content**: `{"affectedRows": 1, ...}`

### Borrowings

#### Get all borrowings

- **URL**: `/borrowings`
- **Method**: `GET`
- **Success Response**:
    - **Code**: 200
    - **Content**: `[{"BorrowingID": 1, "BorrowDate": "2023-01-01", "ReturnDate": "2023-01-10", "BookTitle": "Book Title", "PatronName": "Patron Name"}]`

#### Add a new borrowing record

- **URL**: `/borrowings`
- **Method**: `POST`
- **Body Parameters**:
    - `BorrowDate` (string)
    - `ReturnDate` (string)
    - `PatronID` (number)
    - `BookID` (number)
- **Success Response**:
    - **Code**: 200
    - **Content**: `{"affectedRows": 1, ...}`

### Staff

#### Get all staff members

- **URL**: `/staff`
- **Method**: `GET`
- **Success Response**:
    - **Code**: 200
    - **Content**: `[{"StaffID": 1, "Name": "Staff Name", ...}]`

#### Add a new staff member

- **URL**: `/staff`
- **Method**: `POST`
- **Body Parameters**:
    - `Name` (string)
    - `Position` (string)
    - `ContactInfo` (string)
- **Success Response**:
    - **Code**: 200
    - **Content**: `{"affectedRows": 1, ...}`

## Contributing

Feel free to submit issues, fork the repository, and send pull requests!

## License

This project is licensed under the MIT License.
