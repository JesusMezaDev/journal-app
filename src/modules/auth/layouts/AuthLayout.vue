<template>
	<Spinner />
	<div class="container-sm">
		<div class="row d-flex justify-content-center">
			<div class="col">
				<div class="card m-5">
					<RouterView />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { defineAsyncComponent } from 'vue';
	const Spinner = defineAsyncComponent(() => import('@/shared/modules/spinner/views/SpinnerView.vue'));
</script>

<style scoped>
	
</style>