function ObjectPagination(data, page_size, randomize) {

    //private member variables & functions
    this._ = {
        "pages": [],
        "randomize_array": function () {
            //randomize array
            for (var n = 0; n < data.length - 1; n++) {
                var k = n + Math.floor(Math.random() * (data.length - n));

                var temp = data[k];
                data[k] = data[n];
                data[n] = temp;
            }
        },
        "page_init": function () {
            //initialize page object
            for (var i = 0; i < (data.length / page_size) ; i++) {
                var page_obj = [];
                for (var j = 0; j < page_size; j++) {
                    if (data[(i * page_size) + j]) {
                        page_obj.push(data[(i * page_size) + j]);
                    }
                }
                this.pages.push(page_obj);
            }
        }
    };

    //get page function
    this.get_page = function (index) {
        //console.log("page size is " + page_size);
        //console.log("page length is " + this._.pages.length);
        console.log("index: get me page " + index);

        //If the requested index is greater than page_size, shrink it down to a number that is less than the page size
        //this is used for when there arent enough pages created and returns a page already in the list by doing some maths.
        while (index >= (this._.pages.length)) {
            index = index - (this._.pages.length);
        }
        console.log("index is now: " + index);
        //while (index > (page_size - 1)) {
        //    index = index - (page_size - 1);
        //}

        if (index < this._.pages.length) {
            console.log("giving you page " + index);
            //return requested page object at index
            return this._.pages[index];
        } else {
            console.log("giving you page", (page_size - 1) % index);
            //if index requested is greater than pagination object length, return the modulus of index and page size
            //this ensures we stay within the range of 0 to page_size
            return this._.pages[((page_size - 1) % index)];
        }
    };

    //call randomize function if randomize parameter is true
    if (randomize) {
        this._.randomize_array();
    }

    //Initialization of page object
    this._.page_init();
}