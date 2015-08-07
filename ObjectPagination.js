function ObjectPagination(data, page_size, randomize) {

    //private member variables & functions
    this._ = {
        "pages": [],
        "page_init": function page_init(data, page_size) {
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
        //If the requested index is greater than page_size, shrink it down to a number that is less than the page size
        //this is used for when there arent enough pages created and returns a page already in the list by doing some maths.
        while (index > (page_size-1)) {
            index = index - (page_size-1);
        }
        if (index < this._.pages.length) {
            //return requested page object
            return this._.pages[index];
        } else {
            //if index requested is greater than pagination object length, return the modulus of index and page size
            //this ensures we stay within the range of 0 to page_size
            return this._.pages[((page_size-1) % index)];
        }
    };

    //randomize function
    this.randomize_data = function shuffle(source_array) {
        for (var n = 0; n < source_array.length - 1; n++) {
            var k = n + Math.floor(Math.random() * (source_array.length - n));

            var temp = source_array[k];
            source_array[k] = source_array[n];
            source_array[n] = temp;
        }
        return source_array;
    }
    
    //Initialization of page object
    if (randomize) {
        //if randomized is true, randomize data then call init function
        this._.page_init(this.randomize_data(data), page_size);
    }
    else {
        //if randomized is false, call init function with data as-is
        this._.page_init(data, page_size);
    }

}