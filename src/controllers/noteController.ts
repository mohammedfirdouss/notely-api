import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { successResponse, errorResponse, paginatedResponse, asyncHandler } from '../utils/response';
import { NoteCreateData, NoteUpdateData, QueryFilters } from '../types';

export const createNote = asyncHandler(async (req: any, res: Response) => {
  const { title, content }: NoteCreateData = req.body;
  const userId = req.user._id;

  const note = new Note({
    title,
    content,
    userId
  });

  await note.save();

  return successResponse(res, note, 'Note created successfully', 201);
});

export const getNotes = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user._id;
  const {
    title,
    dateFrom,
    dateTo,
    page = 1,
    limit = 10
  }: QueryFilters = req.query;

  // Build query
  const query: any = { userId };

  // Title search (case-insensitive partial match)
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  // Date range filter
  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) {
      query.createdAt.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      query.createdAt.$lte = new Date(dateTo);
    }
  }

  // Pagination
  const pageNum = parseInt(page.toString());
  const limitNum = parseInt(limit.toString());
  const skip = (pageNum - 1) * limitNum;

  // Execute query with pagination
  const [notes, total] = await Promise.all([
    Note.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Note.countDocuments(query)
  ]);

  return paginatedResponse(res, notes, pageNum, limitNum, total, 'Notes retrieved successfully');
});

export const getNoteById = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const userId = req.user._id;

  const note = await Note.findOne({ _id: id, userId });
  if (!note) {
    return errorResponse(res, 'Note not found', 404);
  }

  return successResponse(res, note, 'Note retrieved successfully');
});

export const updateNote = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const userId = req.user._id;
  const updates: NoteUpdateData = req.body;

  // Remove empty fields
  Object.keys(updates).forEach(key => {
    if (updates[key as keyof NoteUpdateData] === undefined || updates[key as keyof NoteUpdateData] === '') {
      delete updates[key as keyof NoteUpdateData];
    }
  });

  if (Object.keys(updates).length === 0) {
    return errorResponse(res, 'No valid updates provided', 400);
  }

  const note = await Note.findOneAndUpdate(
    { _id: id, userId },
    updates,
    { new: true, runValidators: true }
  );

  if (!note) {
    return errorResponse(res, 'Note not found', 404);
  }

  return successResponse(res, note, 'Note updated successfully');
});

export const deleteNote = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const userId = req.user._id;

  const note = await Note.findOneAndDelete({ _id: id, userId });
  if (!note) {
    return errorResponse(res, 'Note not found', 404);
  }

  return successResponse(res, { id }, 'Note deleted successfully');
});

export const searchNotes = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user._id;
  const { q, page = 1, limit = 10 } = req.query;

  if (!q) {
    return errorResponse(res, 'Search query is required', 400);
  }

  // Build text search query
  const query = {
    userId,
    $text: { $search: q }
  };

  // Pagination
  const pageNum = parseInt(page.toString());
  const limitNum = parseInt(limit.toString());
  const skip = (pageNum - 1) * limitNum;

  // Execute search with pagination
  const [notes, total] = await Promise.all([
    Note.find(query, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' }, createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Note.countDocuments(query)
  ]);

  return paginatedResponse(res, notes, pageNum, limitNum, total, 'Search completed successfully');
});
