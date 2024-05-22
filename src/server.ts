import { Elysia, t } from "elysia"
import swagger from "@elysiajs/swagger"
import cors from '@elysiajs/cors'

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
  .use(cors())
  .use(swagger())
  .get('/', { msg: 'hello' })
  .get('/random', random)
  .get('/randBetween', ({ query }) => randBetween(+query.min, +query.max), {
    query: t.Object({
      min: t.Numeric(),
      max: t.Numeric()
    })
  })
  // .get('/randTo/:max', ({ params }) => randTo(+params.max), {
  //   params: t.Object({
  //     max: t.Numeric()
  //   })
  // })
  .get('/randTo/:max', ({ params }) => randTo(+params.max))
  .listen(4000)

console.log('elysia 🦊 on http://localhost:4000')

export type App = typeof app