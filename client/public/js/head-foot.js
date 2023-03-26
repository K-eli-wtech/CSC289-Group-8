class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="header">
                <!--Javascript to access API-->
                <script>
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://api",
                        "method": "GET"
                    }
                </script>

                <a href="arcadia.html"><h1 style="color: #a81000">Arcadia</h1></a>
                <h3>
                <ul class="navigation_bar">
                    <li><a href="newest_games.html">NEWEST GAMES</a></li>
                    <li><a href="recommender.html">RECOMMENDER</a></li>
                    <li><a href="about.html">ABOUT</a></li>

                    <li style="float: right; padding-right: 10px;">
                    <button class ="login" type="button" onclick="window.location.href = 'login.html';">
                        <ion-icon name="person-circle"></ion-icon>
                    </button> 
                    </li>
                    <li style="float: right; padding-right: 10px;">
                    <button class ="search" type="button" onclick="window.location.href = 'search.html';">
                        <ion-icon name="search-circle-outline"></ion-icon>
                    </button> </li>
                </ul> 
                </h3>
            </div>
        `
    }
}

customElements.define('my-header', myHeader)

class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <aside>
                <div class="content"></div>
                <h3>CREATED BY:</h3>
                <ul>
                    <li>KATHERINE ALEXANDER</li>
                    <li>TYLER BROWNING</li>
                    <li>DAVIN MCFADDIN</li>
                    <li>KALEB WHITE</li>
                </ul>
                </aside>
                <aside>
                <div id="contact" class="content"></div>
                <h3>Contact Us</h3>
                </aside>
            </footer>
        `
    }
}

customElements.define('my-footer', myFooter)