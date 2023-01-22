const MAX_PER_PAGE = 20;

class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i',
      },
    }
      : {

      };
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ['keyword', 'page', 'limit', 'perPage', 'sort'];

    removeFields.forEach((key) => delete queryCopy[key]);
    this.query = this.query.find(queryCopy);
    return this;
  }

  sort() {
    const { sort } = this.queryStr;
    if (sort) {
      this.query.sort({ [sort]: -1 });
    }

    return this;
  }

  pagination() {
    const currentPage = this.queryStr.page ? Number(this.queryStr.page) : 1;
    const resultPerPage = this.queryStr.perPage && Number(this.queryStr.perPage) < MAX_PER_PAGE
      ? Number(this.queryStr.perPage)
      : MAX_PER_PAGE;
    const skip = resultPerPage * (currentPage - 1);
    console.log(resultPerPage);
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }

  populate(args) {
    this.query.populate(args);
    return this;
  }
}

export default Features;
