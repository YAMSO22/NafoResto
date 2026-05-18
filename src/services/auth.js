import db from '../database/db';

export const login = (pin, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM employees WHERE pin = ?',
      [pin],
      (_, { rows }) => {
        if (rows.length > 0) callback(rows._array[0]);
        else callback(null);
      }
    );
  });
};
