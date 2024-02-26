import React from 'react';

const UserBookmarks = ({ bookmarks }) => {
  return (
    <div>
      <h2>Bookmarks:</h2>
      {bookmarks && bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>{bookmark}</li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks</p>
      )}
    </div>
  );
};

export default UserBookmarks;
