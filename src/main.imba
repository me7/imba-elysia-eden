import {treaty} from '@elysiajs/eden'
import type { App } from './server'
const api = treaty<App>('localhost:4000')

def get-count
	let {data, err} = await api.random.get()
	return data

def get-rand-to max
	let {data, err} = await api.randTo({max:max})
	return data

def get-rand-between min, max
	let {data, err} = await api.randBetween.get(query:{min:min, max:max})
	return data

tag Main
	count
	<self [d:vflex g:1]>
			<button @click=(count = await get-count!)> "GET RANDOM"
			<button @click=(count = await get-rand-to(30)) > "GET RAND-To-30"
			<button @click=(count = await get-rand-between(10, 100)) > "GET RAND-BETWEEN-10 to 100"
			<div> "count is {JSON.stringify(count)}"

imba.mount <Main>
