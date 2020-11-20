<template>
  <div>
    <h1>Home</h1>
    
    <!-- <div class="slideshow-container">

      <div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img src="../image/첫번째.jpg" style="width:100%">
        <div class="text">Caption One</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">2 / 3</div>
        <img src="../image/두번째.jpg" style="width:100%">
        <div class="text">Caption Two</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">3 / 3</div>
        <img src="../image/세번째.jpg" style="width:100%">
        <div class="text">Caption Three</div>
      </div>

      <br>

      <div style="text-align:center">
        <span class="dot"></span> 
        <span class="dot"></span> 
        <span class="dot"></span> 
      </div>
    </div> -->
    

    <ul class="row">
      <RecommendMovieCard
        v-for="(movie, idx) in recommendmovies"
        :key="idx"
        :movie="movie"
        class="col-lg-2 col-md-4 col-sm-6 col-xs-12"
      />
    </ul>
  </div>
  
</template>

<script>
import RecommendMovieCard from '../components/RecommendMovieCard.vue'
import axios from 'axios'
export default {
  components: {
    RecommendMovieCard,
  },
  data() {
    return {
      recommendmovies:[],
    }
  },
  methods: {
    
  },
  
  created() {
    axios({
      url:'http://127.0.0.1:8000/movies/bestFive/',
      method:'GET',
    }).then((res)=>{
      console.log(res)
      const temp=[]
      res.data.forEach(function(element){
        temp.push(element)
      })
      this.recommendmovies=temp
    }).catch((err)=>{
      console.error(err)
    })
    // let slideIndex = 0;
    // function showSlides() {
      
    //   let i;
      
    //   const slides = document.getElementsByClassName("mySlides");
    //   console.log(slides)
    //   const dots = document.getElementsByClassName("dot");
    //   for (i = 0; i < slides.length; i++) {
    //     console.log(slides[i])
    //     slides[i].style.display = "none";  
    //   }
    //   slideIndex++;
    //   if (slideIndex > slides.length) {slideIndex = 1}    
    //   for (i = 0; i < dots.length; i++) {
    //       dots[i].className = dots[i].className.replace(" active", "");
    //   }
    //   slides[slideIndex-1].style.display = "block";  
    //   dots[slideIndex-1].className += " active";
    //   setTimeout(showSlides, 2000); // Change image every 2 seconds
    //   console.log(slides[0])
    // }
    
    // showSlides();
    
    
  },
  
}
</script>

<style>
  
  * {box-sizing: border-box;}
  body {font-family: Verdana, sans-serif;}
  .mySlides {display: none;}
  img {vertical-align: middle;}

  
  .slideshow-container {
    max-width: 1000px;
    position: relative;
    margin: auto;
  }


  .text {
    color: #000000;
    font-size: 15px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
  }

 
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }


  .dot {
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active {
    background-color: #717171;
  }


  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @-webkit-keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
  }

  @keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
  }

  
  @media only screen and (max-width: 300px) {
    .text {font-size: 11px}
  }
</style>