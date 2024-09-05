class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //search function
    search() {
        let keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      //Not to make it Case Sensitive
                      $options: "i",
                  },
              }
            : {};

        this.query.find({ ...keyword });
        return this;
    }

    //filter function
    filter() {
        const queryStrCopy = { ...this.queryStr };

        //Removing fields from query
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach((field) => queryStrCopy[field]);

        //Add $ before lt, lte, gt, gte
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)/g,
            (match) => `$${match}`
        );

        this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports = APIFeatures;
