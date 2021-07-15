<template>
    <div>
<!--			@todo design this damn page -->
			test
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	mounted() {
		console.log(this.$route.params.id)
	},
})

</script>
