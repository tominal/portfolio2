<template>
  <div class="w-full h-full pb-48 bg-gray-100">
		<div class="w-full h-screen flex place-items-center text-center bg-fixed bg-center bg-cover bg-trees">
			<h1 class="flex-auto tracking-wider text-3xl text-white text-yellow-500 font-bold">
				Thomas
			</h1>
		</div>

		<h2 class="my-6 text-xl">About me</h2>
		<div class="flex px-8 justify-center">
			<div v-if="!busy" class="text-left p-6 max-w-screen-sm shadow-md rounded-md bg-white spacing-y-3" v-html="aboutMe"></div>
			<div v-else class="flex-1 text-left p-6 max-w-screen-sm shadow-md rounded-md bg-white spacing-y-3">
				<div class="skeleton-box min-w-screen-sm h-4 mb-2"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-2"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-6"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-2"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-2"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-6"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-2"></div>
				<div class="skeleton-box min-w-screen-sm h-4 mb-2"></div>
				<div class="skeleton-box min-w-screen-sm h-4"></div>
			</div>
		</div>

		<h2 class="mt-24 text-xl">Scripting / Programming Languages</h2>
		<div
				class="flex justify-center"
		>
			<div class="flex justify-center text-left p-6 pt-2 max-w-screen-md">
				<div
						v-for="(l,k) in languages"
						:key="'l'+k"
						class="bg-yellow-600 flex-none rounded-full p-1 px-3 my-1 text-center text-white font-bold mx-1"
						style=""
				>
					{{ l }}
				</div>
			</div>
		</div>

		<h2 class="mt-2 text-xl">General Skills</h2>
		<div
				class="flex justify-center"
		>
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-md">
				<div
						v-for="(g,k) in general"
						:key="'g'+k"
						class="bg-yellow-600 flex-none rounded-full p-1 px-3 my-1 text-center text-white font-bold mx-1"
				>
					{{ g }}
				</div>
			</div>
		</div>

		<h2 class="mt-2 text-xl">Frameworks</h2>
		<div
				class="flex justify-center"
		>
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-md">
				<div
						v-for="(f,k) in frameworks"
						:key="'f'+k"
						class="bg-yellow-600 flex-none rounded-full p-1 px-3 my-1 text-center text-white font-bold mx-1"
				>
					{{ f }}
				</div>
			</div>
		</div>

		<h2 class="mt-24 text-xl">Projects</h2>

		<p>
			Left off here. Can create a custom object in Drupal to manage project objects in there instead of raw code.
		</p>


		<h2 class="mt-24 text-xl">Blog</h2>

		<p>
			Use Drupal to manage the content of the blogs. RSS feed tests to see if that will work on publishing, too.
		</p>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'
import _ from "lodash"

export default defineComponent({
	name: 'Home',
	data() {
		return {
			busy: false,

			aboutMe: "",

			general: [
					'Jira Software',
					'Ubuntu Server Admin.',
					'AWS',
					'Git',
					'Adobe Products',
					'Microsoft Office',
					'Google Workspace',
					'Google Office',
					'JetBrains',
			],
			languages: [
					'PHP',
					'Node.js',
					'SQL',
					'JavaScript',
					'Vue.js',
					'jQuery',
					'C++',
			],
			frameworks: [
					'Laravel',
					'Koa.js',
					'TailwindCSS',
					'Electron',
					'Bootstrap',
					'Vuetify',
					'Drupal',
			],

			projects: [
				{

				}
			]
		}
	},

	mounted() {
		this.busy = true
		axios.get('http://personal.blog/jsonapi/node/page').then(r => {
			let aboutMe = _.find(r.data.data, { attributes: { title: "About me" } })
			if(aboutMe) {
				this.aboutMe = aboutMe.attributes.body.value
			}
			this.busy = false
		})
	},
});
</script>

<style>
.bg-trees {
	background-color: black;
	background-image: url('/trees.jpg');
}
.skeleton-box {
	position: relative;
	overflow: hidden;
	background-color: #e2e8f0;
}
.skeleton-box::after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transform: translateX(-100%);
	background-image: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0,
		rgba(255, 255, 255, 0.2) 20%,
		rgba(255, 255, 255, 0.5) 60%,
		rgba(255, 255, 255, 0)
	);
	animation: shimmer 3s infinite;
	content: '';
}
@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}
</style>
