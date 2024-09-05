class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

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

    filter() {
        const queryStrCopy = { ...this.queryStr };

        //Removing fields from query
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach((field) => queryStrCopy[field]);

        if (queryStrCopy.category) {
            queryStrCopy.category = {
                $regex: queryStrCopy.category,
                $options: "i",
            };
        }

        this.query.find(queryStrCopy);
        return this;
    }
}

module.exports = APIFeatures;
