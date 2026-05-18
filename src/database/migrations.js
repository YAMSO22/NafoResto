import db from './db';

export function migrate() {
  db.transaction(tx => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      full_name TEXT,
      role TEXT,
      pin TEXT
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name TEXT,
      category TEXT,
      price REAL,
      available INTEGER
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      product_name TEXT,
      quantity REAL,
      min_threshold REAL
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      total REAL,
      payment_method TEXT,
      created_at TEXT
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS sale_items (
      id TEXT PRIMARY KEY,
      sale_id TEXT,
      menu_item_id TEXT,
      quantity INTEGER,
      price REAL
    );`);
  });
}
