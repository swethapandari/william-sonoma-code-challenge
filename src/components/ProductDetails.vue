<template>
  <div>
    William - Sonoma Code Challenge<br/>
    <span>
      <span v-for="product in products.groups" :key="product.id">
        {{product.name}} <br/>

        <img v-if="product.thumbnail" :src="product.thumbnail.href" :alt="product.thumbnail.alt" :meta="product.thumbnail.meta" :size="product.thumbnail.size" :width="product.thumbnail.width" :height="product.thumbnail.height"/>
        <div>
        
        <span v-if="product.price">{{product.price.regular}}</span>        
        <span v-else-if="product.priceRange.regular">Regular Price:{{product.priceRange.regular.high}} - {{product.priceRange.regular.low}}</span>
        <span v-else-if="product.priceRange.selling">Sale Price:{{product.priceRange.selling.high}} - {{product.priceRange.selling.low}}</span>
        <span v-else>Price:{{product.priceRange.regular}}</span>
        </div>
      </span>
    </span>     
      <br/>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
    return {
      products: {},
        }
    },
    mounted () {
       axios.get('productsList.json')
        .then(response => { this.products = response.data; })
        .catch((error) => {
            throw error.response.data;
        });
  }
}
</script>
