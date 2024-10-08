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

        // Removing fields from query
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach((field) => delete queryStrCopy[field]);

        // Add $ before gt, gte, lt, lte
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        // Replace $ with $ just before executing the query
        queryStr = queryStr.replace(
            /$(gt|gte|lt|lte)\b/g,
            (match, p1) => `$${p1}`
        );
        this.query.find(JSON.parse(queryStr));
        return this;
    }

    //pagination
    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
