<template>
  <div class="w-full h-full bg-gray-100">
		<div class="w-full h-screen flex place-items-center text-center bg-fixed bg-center bg-cover bg-trees">
			<h1 class="flex-auto tracking-wider text-3xl text-white text-yellow-500 font-bold">
				Thomas
			</h1>
		</div>

		<h2 class="my-6 text-xl projects">About me</h2>
		<div class="flex px-2 sm:px-8 justify-center">
			<div v-if="!busy" class="text-left p-6 max-w-screen-lg shadow-md rounded-md bg-white spacing-y-3" v-html="aboutMe"></div>
			<div v-else class="flex-1 text-left p-6 max-w-screen-lg shadow-md rounded-md bg-white spacing-y-3">
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

		<h2 class="mt-24 text-xl skills">Scripting / Programming Languages</h2>
		<div
				class="flex justify-center"
		>
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-lg">
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
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-lg">
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
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-lg">
				<div
						v-for="(f,k) in frameworks"
						:key="'f'+k"
						class="bg-yellow-600 flex-none rounded-full p-1 px-3 my-1 text-center text-white font-bold mx-1"
				>
					{{ f }}
				</div>
			</div>
		</div>

		<h2 class="mt-24 text-xl mb-6">Professional Work</h2>
		<div class="flex flex-wrap justify-center px-2 sm:px-8 place-items-center max-w-screen-lg mx-auto">
			<div
					v-for="p in projects"
					:key="'p' + p.id"
					class="p-2 w-full sm:w-1/2 md:w-1/3"
			>
				<div
						class="bg-white w-full shadow-md rounded-md cursor-pointer p-3"
						@click="openProject(p.id)"
				>
					<img
							v-if="'undefined' !== typeof p.relationships.field_image && p.relationships.field_image.data"
							:src="findImage(p.relationships.field_image.data.id)"
							alt=""
							class="mx-auto pt-3 max-h-12"
					>
					<div class="p-3">
						<h3 class="font-bold">{{ p.attributes.title }}</h3>
						<p v-html="p.attributes.body.value"></p>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal -->
		<div class="fixed pin z-50 shadow-md overflow-auto flex text-left" v-if="showProject" @click.self="showProject = false">
			<div class="animated fadeInUp fixed shadow-inner max-w-lg md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
				<img
						v-if="'undefined' !== typeof project.relationships.field_image && project.relationships.field_image.data"
						:src="findImage(project.relationships.field_image.data.id)"
						alt=""
						class="mx-auto max-h-12"
				>
				<h4 class="pt-6 font-bold">{{ project.attributes.title }}</h4>
				<div class="mb-6" v-html="project.attributes.body.value"></div>
				<pre v-text="project.attributes.field_summary"></pre>
				<a
						v-if="project.attributes.field_link"
						:href="project.attributes.field_link.uri"
						:title="project.attributes.field_link.title"
						class="w-24 mt-6 text-center text-white font-bold rounded-md sha px-3 py-1 bg-blue-500"
				>
					Visit
				</a>
			</div>
		</div>

		<h2 class="mt-24 text-xl mb-6">Blog</h2>
		<div class="flex flex-wrap justify-center px-2 sm:px-8 max-w-screen-lg mx-auto">
			<div
					v-for="b in blogs"
					:key="'b'+b.id"
					class="p-2 w-full md:w-1/2"
			>
				<div
						class="w-full mx-3 cursor-pointer mx-auto bg-white rounded-md shadow-md p-3 text-left"
						@click="goToBlog(b.id)"
				>
					<h3 class="font-bold">{{ b.attributes.title }}</h3>
					<p>{{ b.attributes.body.summary }}</p>
					<p>
						<small>
							<i>{{ formattedTimestamp(b.attributes.created) }}</i>
						</small>
					</p>
				</div>
			</div>
		</div>

		<h2 class="mt-16">Email subscription</h2>
		<div class="flex flex-wrap justify-center w-full sm:w-96 px-3 mx-auto">
			<input type="email" class="bg-white p-3 w-full sm:w-3/5 mx-1 sm:mx-0" placeholder="john@example.com">
			<div class="text-center w-2/5 mt-2 sm:mt-0 pl-1">
				<button
						class="w-full h-8 sm:h-full bg-blue-500 font-bold text-white rounded-md"
				>
					Subscribe
				</button>
			</div>
		</div>
		<p class="text-center">
			<small>
				I post stuff once a month. You will not receive any other emails besides those.
			</small>
		</p>

		<h2 class="mt-24 text-xl">Contact me</h2>
		<p>
			<small>
				I will do my best to reply to your messages. If I do not reply within 3 <b>business days</b>, consider it a &quot;no.&quot;
			</small>
		</p>
		<div class="flex flex-wrap max-w-screen-md mx-auto text-left px-2 sm:px-8">
			<div class="p-2 w-full sm:w-1/2">
				<label for="name" class="text-sm">Name</label>
				<input id="name" type="text" class="w-full p-3 bg-white" placeholder="John Doe">
			</div>
			<div class="p-2 w-full sm:w-1/2">
				<label for="contact_email" class="text-sm">Email</label>
				<input id="contact_email" type="email" class="w-full p-3 bg-white" placeholder="john@example.com">
			</div>
			<div class="w-full p-2">
				<label for="message" class="text-sm">Message</label>
				<textarea id="message" class="w-full p-2" name="message" cols="30" rows="5" :placeholder="randomPlaceholder"></textarea>
				<div class="text-center">
					<button class="bg-blue-500 text-white font-bold p-2 px-6 mt-3 rounded-md">Submit</button>
				</div>
			</div>
		</div>

		<footer class="mt-48">
			&copy; thomasj.me {{ year }}
		</footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'
import _ from "lodash"
import moment from "moment"

export default defineComponent({
	name: 'Home',
	data() {
		return {
			busy: true,
			redirecting: false,

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
					'Laravel Nova',
			],

			loadedProjects: false,
			project: {} as any,
			projects: [],
			projectImages: [] as any,
			showProject: false,

			loadedBlogs: false,
			blogs: [],

			year: moment().format('YYYY'),

			messagePlaceholders: [
					"Remember that one time you ran into a glass door?",
					"Do you really think flaring your nostrils is a talent?",
					"Why are your eyebrows so bushy?",
					"I have a question about...",
					"Can you teach me how to code?",
					"Please answer your phone Thomas I miss you...",
					"Do you have any advice to get started with development?",
			] as string[]
		}
	},

	mounted() {
		axios.get('http://personal.blog/jsonapi/node/page').then(r => {
			let aboutMe = _.find(r.data.data, { attributes: { title: "About me" } })
			if(aboutMe) {
				this.aboutMe = aboutMe.attributes.body.value
			}
			this.busy = false
		});

		this.processInfiniteScroll()
	},

	methods: {
		processInfiniteScroll() {
			window.addEventListener('scroll', (event) => {
				const sidenavBody = document.getElementsByClassName('projects');
				const skillsBody = document.getElementsByClassName('skills');

				if (sidenavBody && sidenavBody[0]){

					if(window.scrollY > sidenavBody[0].scrollTop) {
						if(!this.loadedProjects) {
							this.loadedProjects = true
							axios.get('http://personal.blog/jsonapi/node/project?include=field_image').then(r => {
								this.projects = r.data.data
								this.projectImages = _.filter(r.data.included, { type: "file--file" })
							})
						}
					}
				}

				if (skillsBody && skillsBody[0]){

					if(window.scrollY > skillsBody[0].scrollTop) {
						if(!this.loadedBlogs) {
							this.loadedBlogs = true
							axios.get('http://personal.blog/jsonapi/node/article').then(r => {
								this.blogs = r.data.data
							})
						}
					}
				}
			}, true)
		},

		findImage(field_image_id: string) {
			return "http://personal.blog" + _.find(this.projectImages, { id: field_image_id }).attributes.uri.url
		},

		openProject(id: string) {
			this.project = _.find(this.projects, { id: id })
			this.showProject = true
		},

		formattedTimestamp(str: string) {
			return moment(str).format('LLL')
		},

		goToBlog(blogId: string) {
			if(!this.redirecting) {
				this.$router.push({name: 'Blog', params: {id: blogId}})
				this.redirecting = true
			}
		},
	},

	computed: {
		randomPlaceholder() : string {
			return this.messagePlaceholders[Math.round(Math.random() * this.messagePlaceholders.length)]
		},
	}
});
</script>

<style>
.pin {
	top:0;
	bottom:0;
	left:0;
	right:0;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.5);
}
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
