<template>
	<div class="ft" v-click-outside="hideExpand">
		<!-- Song expand -->
		<transition name="slide-fade">
			<keep-alive>
				<Song v-if="showExpand" @hideExpand="hideExpand" />
			</keep-alive>
		</transition>
		<!-- Main footer -->
		<FooterMain
			:showCurrentList="showCurrentList"
			@changeCurrentListState="handleShowCurrentList"
			@changeExpandState="showExpandState"
		/>

		<!-- Plyr progress -->
		<div class="container" id="progress-plyr">
			<vue-plyr
				ref="player"
				:options="playerOptions"
				@ended="$store.dispatch('onEnd')"
				@playing="$store.state.music_store.isPlaying = true"
				@play="$store.state.music_store.isPlaying = true"
				@pause="$store.state.music_store.isPlaying = false"
				:emit="['ended', 'playing', 'play', 'pause']"
			>
				<audio></audio>
			</vue-plyr>
		</div>

		<!-- Curren List -->
		<transition name="slide-fade">
			<keep-alive>
				<currentList v-if="showCurrentList" @close="showCurrentList = false"></currentList>
			</keep-alive>
		</transition>
	</div>
</template>
<script>
import CurrentList from "./CurrentList";
import FooterMain from "./FooterMain";
import Song from "./CurrentSong";
export default {
	components: {
		CurrentList,
		Song,
		FooterMain,
	},
	data() {
		return {
			showCurrentList: false,
			showExpand: false,
		};
	},
	mounted() {
		this.$store.state.music_store.player = this.$refs.player.player;
	},
	computed: {
		playerOptions() {
			const options = {
				title: "Audio",
				playsinline: true,
				controls: ["progress"],
				debug: false,
				storage: { enabled: true, key: "plyr" },
			};
			return options;
		},
	},
	methods: {
		hideExpand() {
			this.showExpand = false;
		},
		showExpandState() {
			if (this.$store.state.music_store.currentSong.id) {
				if (this.showExpand === false) {
					this.showExpand = true;
					this.showCurrentList = false;
				} else {
					this.showExpand = false;
				}
			}
		},
		handleShowCurrentList() {
			if (this.showCurrentList === false) {
				this.showCurrentList = true;
				this.showExpand = false;
			} else this.showCurrentList = false;
		},
	},
	watch: {
		$route(to, from) {
			if (to.path !== from.path) {
				this.showExpand = false;
			}
		},
	},
};
</script>
<style scoped>
.slide-fade-enter-active {
	transition: all 0.3s ease;
}
.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateY(100px);
	opacity: 0;
}
</style>
<style>
#progress-plyr {
	position: absolute;
	bottom: 60px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
	transition: all 0.2s ease;
}
.plyr__controls {
	background-color: transparent !important;
	padding: 0 !important;
	margin: 0 !important;
}
.plyr__progress input[type="range"]::-webkit-slider-runnable-track {
	color: var(--color-contrast) !important;
	outline-width: 0 !important;
}
.plyr__progress input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none !important;
	border: none !important;
	box-shadow: none !important;
	background: none !important;
}
</style>
