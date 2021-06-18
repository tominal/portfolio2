<template>
    <div>
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
