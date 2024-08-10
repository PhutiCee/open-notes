# OpenNotes

OpenNotes is a simple note-taking application built with Next.js and TypeScript. It allows users to create, update, and delete notes. The application features a user-friendly interface with responsive design using Tailwind CSS.

## Features

- Create new notes
- Edit existing notes
- Delete notes
- Responsive design
- Loading states during operations

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/phuticee/open-notes.git
    cd open-notes
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser**

    Go to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Create a Note

1. Click the "Create" button.
2. Enter the title and content for your note.
3. Click "Submit" to create a new note.

### Edit a Note

1. Click the "Update" button on the note you want to edit.
2. Modify the title and content.
3. Click "Update" to save changes.

### Delete a Note

1. Click the "Delete" button on the note you want to remove.
2. Confirm the deletion.

## API Routes

The project includes the following API routes:

### `POST /api/post`

Creates a new note.

**Request Body:**

```json
{
  "title": "Note Title",
  "content": "Note Content"
}
