import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getComments, addComment } from '../api/commentApi';

const CommentSection = ({ skillId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const loadComments = async () => {
    try {
      const data = await getComments(skillId);
      setComments(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load comments');
    }
  };

  useEffect(() => {
    loadComments();
  }, [skillId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await addComment(skillId, text.trim());
      setText('');
      loadComments(); // reload comments after posting
    } catch (err) {
      console.error(err);
      setError('Failed to post comment');
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-white">Comments</h4>

      {comments.map((c, i) => (
        <div key={i} className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          <strong>{c.user.name}:</strong> {c.text}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="2"
            placeholder="Write your comment..."
            className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="self-end bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-1 rounded-md text-sm"
          >
            Post
          </button>
        </form>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CommentSection;
