export function render(movies) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Movie list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<a href="/logout">abmelden</a>
  <table>
    <thead><tr><th>Id</th><th>Title</th><th></th><th></th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>
            <a href="/movie/rate/${movie.id}/1">${movie.userRating >= 1 ? "✭": "✩"}</a>
            <a href="/movie/rate/${movie.id}/2">${movie.userRating >= 2 ? "✭": "✩"}</a>
            <a href="/movie/rate/${movie.id}/3">${movie.userRating >= 3 ? "✭": "✩"}</a>
            <a href="/movie/rate/${movie.id}/4">${movie.userRating >= 4 ? "✭": "✩"}</a>
            <a href="/movie/rate/${movie.id}/5">${movie.userRating >= 5 ? "✭": "✩"}</a>
          </td>
          <td>${movie.averageRating}</td>
          <td><a href="/movie/delete/${movie.id}">löschen</a></td>
          <td><a href="/movie/form/${movie.id}">bearbeiten</a></td> 
        </tr>`,
        )
        .join('')}
    </tbody>
  </table>
  <a href="/movie/form">neu</a>
</body>
</html>
  `;
}