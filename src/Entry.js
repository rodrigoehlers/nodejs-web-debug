import React from 'react';

const Entry = content => {
  const string = JSON.stringify(content, null, 2);
  return (
    <div>
      <pre>{string}</pre>
    </div>
  );
};

export default Entry;
