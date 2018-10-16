/* feedreader.js
 * This is the spec file that Jasmine will read and contains all of the tests that will be run against your application. */

/* We're placing all of our tests within the $() function, since some of these tests may require DOM elements. 
 * We want to ensure they don't run until the DOM is ready. */

$(function() {

    /* This is our first test suite - a test suite just contains a related set of tests. 
    * This suite is all about the RSS feeds definitions, the allFeeds variable in our application. */
    describe('RSS Feeds', () =>  {

        /* This is our first test - it tests to make sure that the allFeeds variable has been defined and that it is not empty. */
        it('are defined', () =>  {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test to see if each feed has a URL and URL has content. */
        it('have defined URLs', function() {
            allFeeds.forEach(feed => {  // Pass in feed as argument in the forEach function
                let url = feed.url;   
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0); 
            });
         });

        // Test to see if each feed has a name and name has content
        it('have defined names', () => {
            allFeeds.forEach(feed => {
                let name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0); 
            });
         });
    });


    // New test suite named "The menu"
    describe('The Menu', () =>  {

        // Makes sure menu item (html element 'body') is hidden by default.
        it('is hidden by default', () =>  {
            let menu = document.querySelector('body');
            expect(menu.classList.contains("menu-hidden")).toBe(true);
        });
        
        // Test if menu changes visibility when clicked -- hidden by default until clicked once
        it('changes when clicked', () => {
            let menuIcon = document.querySelector('.menu-icon-link');   // Sets menuIcon variable
            let menu = document.querySelector('body');                  // Sets body variable
            menuIcon.click();                                           // Simulate click on menuIcon using click()
            expect(menu.classList.contains("menu-hidden")).toBe(false); // First click will show menu
            menuIcon.click();                                           // Simulate click on menuIcon using click()
            expect(menu.classList.contains("menu-hidden")).toBe(true);  // Second click will hide menu
            });
     });

    // Test - after the loadFeed function runs, there is at least 1 entry loaded into the feed list.
    describe('Initial Entries', () => {

        let initialEntry;           //define variable to use
        beforeEach(done => {        // This will run before the it check
            loadFeed(0, () => {     // Load first feed in the list
                initialEntry = document.querySelector('.entry-link').innerHTML; // Feed's inner HTML
                done();
            });
        });

        it ('loads at least 1 feed initially', (done) => {
            expect(initialEntry).toBeDefined(true);     // Expect innerHTML to have content
            done();
         });
    });


    describe('New Feed Selection', () => {
        // Test that ensures when a new feed is loaded by loadFeed() that the content actually changes.
        let firstFeed;
        let secondFeed;
        beforeEach(done => {
            loadFeed(1, () => {     //Load feed at index 1
                firstFeed = document.querySelector('.entry-link').innerHTML;    // Set firstFeed to innerHTML of feed
                loadFeed(2, () => {     // Load feed at index 2
                    secondFeed = document.querySelector('.entry-link').innerHTML;   // Set secondFeed to innerHTML of feed
                    done(); 
                });
            });            
        });

        it('loads new feeds', (done) => {
            expect(firstFeed !== secondFeed).toBe(true);    // HTML is not identical, indicating seperate entries
            done();
        });
    });

}());
