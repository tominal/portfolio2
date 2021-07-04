<template>
  <div class="h-full text-white bg-trees" style="background-color: #111">
		<div class="py-20 place-items-center text-center">
			<h3 class="flex-auto tracking-wider text-white font-bold">
				Hi there,
			</h3>
			<h1 class="text-3xl font-semibold py-2">
				My name is Thomas
			</h1>
			<p class="uppercase text-orange font-semibold pt-2 pb-4">
				Senior Software Developer
			</p>
			<p>
				<button class="bg-yellow-600 flex-none rounded-2xl p-2 px-6 my-1 mb-12 text-center text-white text-sm font-bold mx-1">
					My Portfolio
				</button>
			</p>
			<p>
				<font-awesome-icon icon="angle-double-down"></font-awesome-icon>
			</p>
		</div>

		<div class="max-w-screen-lg mx-auto flex flex-wrap md:flex-nowrap my-6 px-2 sm:px-8 justify-center projects">
			<div class="flex-auto relative px-20">
				<div class="w-72 h-72 rounded-full bg-yellow-500 mx-auto mt-8"></div>
				<div class="absolute top-0 left-0 w-full">
					<img class="mx-auto w-60" src="/angry_scream.png" alt="">
				</div>
			</div>
			<div class="flex-auto">
				<p class="uppercase text-2xl text-left font-bold mb-8">
					about me
				</p>
				<div v-if="!busy" class="text-left shadow-md rounded-md spacing-y-3 mb-8" v-html="aboutMe"></div>
				<div v-else class="flex-1 text-left p-6 max-w-screen-xl shadow-md rounded-md spacing-y-3">
					<div class="skeleton-box min-w-screen-lg h-4 mb-2"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-2"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-6"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-2"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-2"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-6"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-2"></div>
					<div class="skeleton-box min-w-screen-lg h-4 mb-2"></div>
					<div class="skeleton-box min-w-screen-lg h-4"></div>
				</div>

				<div class="my-8 text-left">
					<button class="rounded-full bg-orange w-8 h-8">
						<font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
					</button>
					<button class="rounded-full ml-4 bg-white text-black w-8 h-8">
						<font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
					</button>
					<button class="rounded-full ml-4 bg-white text-black w-8 h-8">
						<font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
					</button>
				</div>

				<div class="text-left">
					<button class="bg-yellow-600 flex-none rounded-2xl p-2 px-6 my-1 mb-12 text-white text-sm font-bold">
						Contact Me
					</button>
				</div>
			</div>
		</div>

		<p class="mt-32 mb-8 uppercase text-2xl font-bold skills">
			my skills
		</p>
		<div class="flex max-w-screen-sm mx-auto mb-6">
			<div :class="'flex-auto p-4 cursor-pointer font-semibold ' + (activeTab === 0 ? 'border-b-4 border-orange	text-orange' : '')" @mousedown="activeTab = 0">
				General Skill
			</div>
			<div :class="'flex-auto p-4 cursor-pointer font-semibold ' + (activeTab === 1 ? 'border-b-4 border-orange	text-orange' : '')" @mousedown="activeTab = 1">
				Programming Languages
			</div>
			<div :class="'flex-auto p-4 cursor-pointer font-semibold ' + (activeTab === 2 ? 'border-b-4 border-orange	text-orange' : '')" @mousedown="activeTab = 2">
				Frameworks
			</div>
		</div>
		<div
				class="flex justify-center"
		>
			<div class="flex justify-center flex-wrap text-left p-6 pt-2 max-w-screen-sm">
				<div
						v-for="(s,k) in tabs[activeTab]"
						:key="'s'+k"
						class="flex-none rounded-xl p-3 px-6 my-2 text-sm text-center text-white mx-2 border-2 border-gray-500 font-semibold"
						style="background-color: #121416"
				>
					{{ s }}
				</div>
			</div>
		</div>

		<h2 class="mt-32 mb-8 uppercase text-2xl font-bold">my portfolio</h2>
		<div class="flex flex-wrap justify-center px-2 sm:px-8 place-items-center max-w-screen-lg mx-auto">
			<div
					v-for="p in projects"
					:key="'p' + p.id"
					class="p-2 w-full sm:w-1/2 md:w-1/3"
			>
				<div
						class="w-full shadow-md rounded-md cursor-pointer p-6 pt-12 h-64"
						style="background-color: #121416"
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
			<div
					class="animated fadeInUp fixed shadow-inner max-w-lg md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 md:rounded w-full md:h-auto md:shadow flex flex-col"
					style="background-color: #121416"
			>
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

		<div class="mt-32 rounded-3xl max-w-screen-md mx-auto p-6 border-4 border-orange">
			<p class="mt-8 uppercase text-2xl font-bold">email subscription</p>
			<p class="my-4 text-gray-400 text-sm">
				I post stuff once a month. You will not receive any other emails besides those.
			</p>
			<input type="email" class="rounded-full mt-4 p-3 w-full sm:w-3/5 mx-1 sm:mx-0 border-2 border-gray-500" placeholder="Your email..." style="background-color: #111">
			<div class="text-center mt-2 sm:mt-0 pl-1">
				<button
						class="bg-yellow-600 flex-none rounded-2xl p-2 px-6 mt-3 mb-12 text-center text-white text-sm font-bold mx-1"
				>
					Subscribe
				</button>
			</div>
		</div>

		<h2 class="mt-32 mb-8 uppercase text-2xl font-bold">my blog</h2>
		<div class="flex flex-wrap justify-center px-2 sm:px-8 max-w-screen-lg mx-auto">
			<div
					v-for="b in blogs"
					:key="'b'+b.id"
					class="p-2 w-full md:w-1/2"
			>
				<div
						class="w-full mx-3 cursor-pointer rounded-b-md mx-auto shadow-md text-left"
						@click="goToBlog(b.id)"
						style="background-color: #121416"
				>
					<div class="rounded-t-md overflow-hidden max-h-48" style="background-color: #232323">
						<img
							v-if="'undefined' !== typeof b.relationships.field_image && b.relationships.field_image.data"
							:src="findBlogImage(b.relationships.field_image.data.id)"
							alt=""
							class="mx-auto min-h-full"
						>
					</div>
					<div class="p-3">
						<h3 class="font-bold">{{ b.attributes.title }}</h3>
						<p class="text-gray-500 text-sm">
							<small>
								<i>{{ formattedTimestamp(b.attributes.created) }}</i>
							</small>
						</p>
						<p class="text-gray-400 pt-3">{{ b.attributes.body.summary }}</p>
						<p class="text-right text-orange">
							Read more <font-awesome-icon class="ml-2 text-sm" icon="long-arrow-alt-right"></font-awesome-icon>
						</p>
					</div>

				</div>
			</div>
		</div>

		<div class="mt-32 rounded-3xl max-w-screen-md mx-auto p-8 border-4 border-orange">
			<h2 class="my-4 uppercase text-2xl font-bold">Contact me</h2>
			<p class="text-gray-400 mb-4">
				<small>
					I will do my best to reply to your messages. If I do not reply within 3 <b>business days</b>, consider it a &quot;no.&quot;
				</small>
			</p>
			<div class="flex flex-wrap max-w-screen-md mx-auto text-left px-2 sm:px-8">
				<div class="p-2 w-full sm:w-1/2">
<!--					<label for="name" class="text-sm">Name</label>-->
					<input id="name" type="text" class="rounded-full w-full mt-4 p-3 mx-1 sm:mx-0 border-2 border-gray-500" placeholder="Your name ..." style="background-color: #111">
				</div>
				<div class="p-2 w-full sm:w-1/2">
<!--					<label for="contact_email" class="text-sm">Email</label>-->
					<input id="contact_email" type="email" class="rounded-full w-full mt-4 p-3 mx-1 sm:mx-0 border-2 border-gray-500" placeholder="Email ..." style="background-color: #111">
				</div>
				<div class="w-full p-2">
<!--					<label for="message" class="text-sm">Message</label>-->
					<textarea id="message" class="rounded-3xl mt-4 p-3 w-full mx-1 sm:mx-0 border-2 border-gray-500" name="message" cols="30" rows="5" :placeholder="randomPlaceholder" style="background-color: #111"></textarea>
					<div class="text-center">
						<button class="bg-yellow-600 flex-none rounded-2xl p-2 px-6 mt-3 mb-12 text-center text-white text-sm font-bold mx-1">
							Send Now
						</button>
					</div>
				</div>
			</div>
		</div>

		<footer class="mt-32 py-24 uppercase text-gray-400" style="background-color: #171717">
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

			activeTab: 1,
			tabs: [
				[
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
				[
					'PHP',
					'Node.js',
					'SQL',
					'JavaScript',
					'Vue.js',
					'jQuery',
					'C++',
				],
				[
					'Laravel',
					'Koa.js',
					'TailwindCSS',
					'Electron',
					'Bootstrap',
					'Vuetify',
					'Drupal',
					'Laravel Nova',
				]
			],
			general: [

			],
			languages: [

			],
			frameworks: [

			],

			loadedProjects: false,
			project: {} as any,
			projects: [],
			projectImages: [] as any,
			blogImages: [] as any,
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
							axios.get('http://personal.blog/jsonapi/node/article?include=field_image').then(r => {
								this.blogs = r.data.data
								this.blogImages = _.filter(r.data.included, { type: 'file--file' })
							})
						}
					}
				}
			}, true)
		},

		findImage(field_image_id: string) {
			return "http://personal.blog" + _.find(this.projectImages, { id: field_image_id }).attributes.uri.url
		},
		findBlogImage(field_image_id: string) {
			return "http://personal.blog" + _.find(this.blogImages, { id: field_image_id }).attributes.uri.url
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
