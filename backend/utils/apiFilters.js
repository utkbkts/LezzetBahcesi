class apiFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchResult() {
    const search = this.queryStr.search
      ? {
          $or: [
            {
              "productDetail.title": {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
            {
              "category.name": {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
            {
              "productDetail.kitchen": {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...search });
    return this;
  }
  filters() {
    const queryCopy = { ...this.queryStr };
    const fieldsToRemove = ["search", "page"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|eq)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
  }
}

export default apiFilter;
