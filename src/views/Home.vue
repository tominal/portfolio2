<template>
  <div class="w-full h-full pb-48 bg-gray-100">
		<div class="w-full h-screen flex place-items-center text-center bg-fixed bg-center bg-cover bg-trees">
			<h1 class="flex-auto tracking-wider text-3xl text-white text-yellow-500 font-bold">
				Thomas
			</h1>
		</div>

		<h2 class="my-6 text-xl projects">About me</h2>
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

		<h2 class="mt-24 text-xl skills">Scripting / Programming Languages</h2>
		<div
				class="flex justify-center"
		>
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-md">
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

		<h2 class="mt-24 text-xl mb-6">Projects</h2>
		<div class="flex flex-wrap justify-center max-w-screen-md mx-auto">
			<div
					v-for="p in projects"
					:key="'p' + p.id"
					class="bg-white w-full sm:w-1/4 md:w-1/4 shadow-md rounded-md cursor-pointer mx-3 mt-6 p-2"
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
		<!-- Modal -->
		<div class="fixed pin z-50 overflow-auto flex text-left" v-if="showProject" @click.self="showProject = false">
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

		<h2 class="mt-24 text-xl">Blog</h2>

		<div class="max-w-screen-md px-3 mx-auto">
			<div
					v-for="b in blogs"
					:key="'b'+b.id"
					class="mx-3 cursor-pointer mx-auto max-w-screen-sm bg-white rounded-md shadow-md mt-6 p-3 text-left"
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
