// Simple test file to verify TypeScript setup
console.log('Hello, Notely API!');

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const sampleNote: Note = {
  id: '1',
  title: 'Test Note',
  content: 'This is a test note to verify TypeScript compilation.',
  createdAt: new Date()
};

console.log('Sample note:', sampleNote);