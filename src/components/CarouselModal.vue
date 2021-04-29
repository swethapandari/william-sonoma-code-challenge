<template>
  <div>
    <b-modal :id="this.modal.id" :title="this.modal.name" hide-footer centered>
      <div>
        <b-carousel v-model="activeImage" :interval="0">
          <b-carousel-slide
            v-for="(image, index) in this.modal.images"
            :key="index"
            :img-src="image.href"
          >
          </b-carousel-slide>
        </b-carousel>
        <div class="thumbnails thumbnail-image" v-if="modal.images && modal.images.length > 1">
          <div
            v-for="(image, index) in this.modal.images"
            :key="index"
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
      activeImage: 0,
    };
  },
  methods: {
    showImage(index) {
      this.activeImage = index;
    },
  },
};
</script>

<style scoped>
.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  overflow: auto;
}
.thumbnail-image{
   padding: 2px;
}
</style>