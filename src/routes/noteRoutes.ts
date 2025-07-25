import { Router } from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes
} from '../controllers/noteController';
import { authenticate } from '../middleware/auth';
import {
  validateCreateNote,
  validateUpdateNote,
  validateNoteQuery
} from '../middleware/validation';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', validateCreateNote, createNote);

/**
 * @route   GET /api/notes
 * @desc    Get all notes for the authenticated user with optional filtering
 * @access  Private
 */
router.get('/', validateNoteQuery, getNotes);

/**
 * @route   GET /api/notes/search
 * @desc    Search notes by title and content
 * @access  Private
 */
router.get('/search', searchNotes);

/**
 * @route   GET /api/notes/:id
 * @desc    Get a specific note by ID
 * @access  Private
 */
router.get('/:id', getNoteById);

/**
 * @route   PUT /api/notes/:id
 * @desc    Update a specific note
 * @access  Private
 */
router.put('/:id', validateUpdateNote, updateNote);

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete a specific note
 * @access  Private
 */
router.delete('/:id', deleteNote);

export default router;
