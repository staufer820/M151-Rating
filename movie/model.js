import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: '127.0.0.1',
  //port: 3307,
  user: 'root',
  password: '',
  database: 'movie-db',
});

await connection.connect();

export async function getAll(userId) {
  const query = 'SELECT * FROM Movies WHERE user = ? OR public = 1';
  const [data] = await connection.query(query, [userId]);
  return data;
}

export async function getUserRating(movieId, userId) {
  const query = 'SELECT rating FROM Ratings WHERE movie = ? and user = ?';
  const [data] = await connection.query(query, [movieId, userId]);
  return data.pop();
}

export async function getAverageRating(movieId, userId) {
  const query = "SELECT AVG(rating) AS average FROM Ratings WHERE movie = ?";
  const [result] = await connection.query(query, [movieId]);
  return result.pop();
}

export async function insertRating(movieId, userId, rating) {
  const query = 'INSERT INTO Ratings (user, movie, rating) VALUES (?, ?, ?)';
  const [result] = await connection.query(query, [userId, movieId, rating]);
  return result;
}

export async function updateRating(movieId, userId, rating) {
  const query = 'UPDATE Ratings SET rating = ? WHERE user = ? AND movie = ?';
  const [result] = await connection.query(query, [rating, userId, movieId]);
  return result;
}

export async function saveRating(movieId, userId, rating) {
  let r = await getUserRating(movieId, userId);
  console.log(r);
  if (!r) {
    return await insertRating(movieId, userId, rating);
  } else {
    return await updateRating(movieId, userId, rating);
  }
}

async function insert(movie, userId) {
  const query = 'INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)';
  const [result] = await connection.query(query, [movie.title, movie.year, movie.public, userId]);
  return { ...movie, id: result.insertId };
}

async function update(movie, userId) {
  const query = 'UPDATE Movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?';
  await connection.query(query, [movie.title, movie.year, movie.public, userId, movie.id]);
  return movie;
}

export async function get(id, userId) {
  const query = 'SELECT * FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
  const [data] = await connection.query(query, [id, userId]);
  return data.pop();
}

export async function remove(id, userId) {
  const query = 'DELETE FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
  await connection.query(query, [id, userId]);
  return;
}

export function save(movie, userId) {
  if (!movie.id) {
    return insert(movie, userId);
  } else {
    return update(movie, userId);
  }
}
