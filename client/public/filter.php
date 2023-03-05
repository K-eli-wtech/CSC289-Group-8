<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
    <meta name="viewport" content=""width=device-width, initial-scale="1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./css/arcadiastyle.css">
    <title> Arcadia</title>
  </head>
  <body>
    
    <!--Latest Reviews and Search Dropdown Container -->
    <section class="latest">
        <div class="filter_dropdown">
            
    <!--Platform Dropdown-->
    <div class="dropdown">
    <button onclick="useDropdown()" class="dropbtn">PLATFORM</button>
    <div id="myDropdown" class="dropdown-content">
        <a href="#">PC</a>
        <a href="#">XBox X</a>
        <a href="#">PS5</a>
        <a href="#">Nintendo Switch</a>
    </div>
    </div> 
    <!--Year Dropdown-->
    <div class="dropdown">
        <button onclick="useDropdown()" class="dropbtn">YEAR</button>
        <div id="myDropdown" class="dropdown-content">
            <a href="#">2023</a>
            <a href="#">2022</a>
            <a href="#">2021</a>
            <a href="#">2020</a>
            <a href="#">2019</a>
            <a href="#">2018</a>
            <a href="#">2017</a>
            <a href="#">2016</a>
            <a href="#">2015</a>
        </div>
    </div>
<!--Rating Dropdown-->
    <div class="dropdown">
        <button onclick="useDropdown()" class="dropbtn">RATING</button>
        <div id="myDropdown" class="dropdown-content">
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
        </div>
    </div>
    <!--Genre Dropdown-->
        <div class="dropdown">
        <button onclick="useDropdown()" class="dropbtn">GENRE</button>
        <div id="myDropdown" class="dropdown-content">
            <a href="#">Action</a>
            <a href="#">Adventure</a>
            <a href="#">Horror</a>
            <a href="#">Puzzle</a>
            <a href="#">RPG</a>
            <a href="#">Simulation</a>
            <a href="#">Strategy</a>
            <a href="#">Sports</a>
            <a href="#">MMO</a>
        </div>
        </div>   
    </div>
    </section>
        
  <!--Javascript for the dropdown menu-->
  <script>
  function useDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 
  </script> 
  </body>
</html>
