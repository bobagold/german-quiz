import marked from 'marked';
import messages from 'de-wiktionary-parser/messages.json';
import noun from 'de-wiktionary-parser/games/noun.json';
import verb from 'de-wiktionary-parser/games/verb.json';
import adjective from 'de-wiktionary-parser/games/adjective.json';
import conjunction from 'de-wiktionary-parser/games/conjunction.json';
import { infinitePlayManyGames } from 'text-quiz-game/src/play';
import { viewN1Move } from 'text-quiz-game/src/game';
import shuffle from 'text-quiz-game/src/shuffle';

// DOM
const $ = document.getElementById.bind(document);
function classEach(className, callback, parent = document) {
  [...parent.getElementsByClassName(className)].forEach(callback);
}
function onClick(el, callback) {
  el.onclick = callback; // eslint-disable-line no-param-reassign
}
function selectClass(el, classes, index) {
  classes.forEach(c => el.classList.remove(c));
  el.classList.add(classes[index]);
}

function markdown(t) {
  return marked(t.replace(/\n/g, '\n\n'));
}

const games = [noun, verb, adjective, conjunction].map(shuffle);
const nextMove = infinitePlayManyGames({
  games, messages, chunk: 5, viewMove: viewN1Move,
});
function answersEach(callback) {
  classEach('btn', callback, $('answers'));
}

function show(move) {
  answersEach((x) => {
    x.innerText = move.answers[x.dataset.id]; // eslint-disable-line no-param-reassign
  });
  $('question').innerHTML = markdown(move.question);
  const msg = move.answer.split('\n')[0];
  const answerParent = $('answerParent');
  const answer = $('answer');
  answer.innerHTML = markdown(move.answer);
  const correct = !msg.includes('~');
  selectClass(answerParent, ['alert-warning', 'alert-success', 'd-none'], Number(correct));
  const score = $('score');
  score.innerText = Number.parseInt(score.innerText, 10) + (correct ? 1 : -1);
}

show({ ...nextMove(), answer: 'Put proper word in a sentence:' });
answersEach(x => onClick(x, () => show(nextMove(x.dataset.id))));

// bootstrap

classEach('close', c => onClick(c, () => classEach(c.dataset.dismiss, d => d.classList.add('d-none'))));
