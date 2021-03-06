import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb implemented to the database', content);

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({id: 1, value: content})

  // Get the confirmation of the request
  const result = await request;
  console.log('new data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb implemented from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');
  // const logics = jateDb.logic('jate', 'readonly');
  
  const store = tx.objectStore('jate');
  // const store = logics.objectStore('jate');

  const request = store.getAll();

  // Get the confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
