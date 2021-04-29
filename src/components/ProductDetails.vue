<template>
  <div>
    <h2>Williams-Sonoma Code Challenge</h2><br/>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6" style="margin-bottom: 25px;" v-for="product in productsList" :key="product.id">
            <div :class="['card', $style.cardCustomStyle]">
              <img @click="openProductModal(product)" 
                  v-b-modal="product.id" class="card-img-top" 
                  v-if="product.heroImage" 
                  :src="product.heroImage.href" 
                  :alt="product.heroImage.alt" 
                  :meta="product.heroImage.meta" 
                  :size="product.heroImage.size" 
                  :width="product.heroImage.width" 
                  :height="product.heroImage.height"
              />          
              <div class="card-body">
                <h6 class="card-title">{{product.name}}</h6>
                <span class="card-text">
                  <span v-if="product.regularPrice && product.salePrice">
                    <strong>Regular Price: {{product.regularPrice}}</strong><br/>
                    <strong :class="$style.saleTag">Sale Price: {{product.salePrice}}</strong>
                  </span>
                  <strong v-if="!product.regularPrice && product.salePrice" :class="$style.salePrice">Sale Price: {{product.salePrice}}</strong>
                  <strong v-if="product.regularPrice && !product.salePrice">Price: {{product.regularPrice}}</strong>
                </span>
              </div>
            </div>
          </div>
          <carousel-modal :modal="productModal"></carousel-modal>
        </div>
    </div> 
      <br/>
  </div>
</template>
<script>
import axios from 'axios';
import CarouselModal from "./CarouselModal.vue";

export default {
  components: {
    CarouselModal,
  },
  data () {
    return {
      productsList: [],
      productModal:'',
    }
  },
  methods: {
    openProductModal(product) {
      this.productModal = product;
    }, 
    getPriceRange(priceRange){
      let RegularPrice = "";
      let SalePrice = "";
      if(priceRange.regular && priceRange.selling){
        RegularPrice = "$"+ priceRange.regular.low + " - $"+ priceRange.regular.high;
        SalePrice = "$"+ priceRange.selling.low + " - $"+ priceRange.selling.high;
      }else if(priceRange.regular){
        RegularPrice = "$"+ priceRange.regular.low + " - $"+ priceRange.regular.high;
      }else if(priceRange.selling){
        SalePrice = "$"+ priceRange.selling.low + " - $"+ priceRange.selling.high;
      } 
      return {RegularPrice, SalePrice};    
    },
    getPrice(price){
      let RegularPrice = "";
      let SalePrice = "";
      if(price.regular && price.selling){
        if(price.regular != price.selling){
          SalePrice = "$"+ price.selling;
          }
        RegularPrice = "$"+ price.regular;
      }else if(price.regular){
        RegularPrice = "$"+ price.regular;
      }else if(price.selling){
        SalePrice = "$"+ price.selling;
      }
      return {RegularPrice, SalePrice};
    },
    getFinalPrice(currentProduct) {
      let RegularPrice = "";
      let SalePrice = "";
      if(currentProduct.priceRange && currentProduct.price){
        RegularPrice = this.getPriceRange(currentProduct.priceRange).RegularPrice || this.getPrice(currentProduct.price).RegularPrice;
        SalePrice = this.getPriceRange(currentProduct.priceRange).SalePrice || this.getPrice(currentProduct.price).SalePrice;
      }
      else if(currentProduct.priceRange){
        RegularPrice = this.getPriceRange(currentProduct.priceRange).RegularPrice;  
        SalePrice = this.getPriceRange(currentProduct.priceRange).SalePrice;      
      }      
      else if(currentProduct.price){
        RegularPrice = this.getPrice(currentProduct.price).RegularPrice;
        SalePrice =  this.getPrice(currentProduct.price).SalePrice;
      }
       return {RegularPrice, SalePrice};
    },

    createProductsList(productInfo){ 
      if (productInfo && productInfo.length > 0) {     
        for (var index = 0; index < productInfo.length; index++) {
          let currentProduct = productInfo[index];
          this.productsList.push({"id":currentProduct.id? currentProduct.id : '', 
                                  "name":currentProduct.name,
                                  "heroImage": currentProduct.hero,
                                  "regularPrice": this.getFinalPrice(currentProduct).RegularPrice , 
                                  "salePrice": this.getFinalPrice(currentProduct).SalePrice, 
                                  "images": currentProduct.images?currentProduct.images : []
                                });
        }
      }
    },
    async fetchData() {
      await axios.get('productsList.json').then(response => {
        this.createProductsList(response.data.groups);        
      }).catch((error) => {
            throw error;
      });
    }
  },   

  mounted() {
     this.fetchData();
  }
}
</script>

<style module>
.saleTag {
 color : red;
}
.cardCustomStyle {
  height:460px;
}
</style>
