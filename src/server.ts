import { Elysia, t } from "elysia"

function random() {
  return randBetween(0, 1)
}

function randTo(max: number) {
  return randBetween(0, max)
}

function randBetween(min, max: number) {
  return ((Math.random() * (max - min)) + min).toFixed(2)
}

const app = new Elysia()
  .get('/', { msg: 'hello' })
  .get('/random', random)
  .get('/rand-between', ({ query }) => randBetween(+query.min, +query.max), {
    query: t.Object({
      min: t.Numeric(),
      max: t.Numeric()
    })
  })
  .get('/rand-to/:max', ({ params }) => randTo(+params.max), {
    params: t.Object({
      max: t.Numeric()
    })
  })
  .listen(3000)

console.log('http://localhost:3000')