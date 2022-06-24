import { getAll, remove, get, save, getUserRating, getAverageRating, saveRating } from './model.js';
import { render } from './view.js';
import { render as form } from './form.js';

export async function listAction(request, response) {
  let data = [];
  let movies = await getAll(request.user.id);
  for (let movie of movies) {
    let userRating = await getUserRating(movie.id, request.user.id);
    let averageRating = (await getAverageRating(movie.id))["average"];
    console.log(movie,userRating, averageRating);
    data.push({...movie, userRating: userRating? userRating.rating : 0, averageRating: averageRating});
  }
  const body = render(data);
  response.send(body);
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id, request.user.id);
  response.redirect(request.baseUrl);
}

export async function formAction(request, response) {
  let movie = { id: '', title: '', year: '', public: '' };

  if (request.params.id) {
    movie = await get(parseInt(request.params.id, 10), request.user.id);
  }

  console.log(movie);

  const body = form(movie);
  response.send(body);
}

export async function rateMovie(request, response) {
  await saveRating(request.params.movie, request.user.id, request.params.rating);
  console.log(request.params);
  response.redirect(request.baseUrl);
}

export async function saveAction(request, response) {
  const movie = {
    id: request.body.id,
    title: request.body.title,
    year: request.body.year,
    public: request.body.public === '1' ? 1 : 0,
  };
  await save(movie, request.user.id);
  response.redirect(request.baseUrl);
}