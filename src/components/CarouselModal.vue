<template>
  <div>
    <b-modal :id="this.modal.id" :title="this.modal.name" hide-footer centered>
      <div>
        <b-carousel v-model="currentSlide" :interval="0">
          <b-carousel-slide
            v-for="(image, i) in this.modal.images"
            :key="i"
            :img-src="image.href"
          >
          </b-carousel-slide>
        </b-carousel>
        <div class="thumbnails" v-if="modal.images && modal.images.length > 1">
          <div
            v-for="(image, index) in this.modal.images"
            :key="index"
            :class="['thumbnail-image']"
          >
            <img
              @click="showImage(index)"
              :src="image.href"
              style="width: 80px"
            />
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "CarouselModal",
  props: ["modal"],
  data() {
    return {
      currentSlide: 0,
    };
  },
  methods: {
    showImage(index) {
      this.currentSlide = index;
    },
  },
};
</script>
<style scoped>
.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
}
.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  overflow: auto;
}
</style>