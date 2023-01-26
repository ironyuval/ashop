import { Filters } from '../../frontend/src/server-shared/types';

const MAX_PER_PAGE = 20;

class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    console.log('queryStr: ', queryStr);
  }

  count() {
    return this.queryCount.countDocuments({});
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      title: {
        $regex: this.queryStr.keyword,
        $options: 'i',
      },
    }
      : {

      };
    this.query = this.query.find({ ...keyword });
    this.queryCount = this.query.clone();

    return this;
  }

  filter() {
    const queryCopy = {};

    const filterNames = Object.keys(Filters);

    filterNames.forEach((filterName) => {
      if (this.queryStr[filterName] && Filters[filterName].type === 'range') {
        const filter = this.queryStr[filterName].split(',');
        const [min, max] = [filter[0], filter[1]];
        queryCopy[filterName] = { $gte: parseInt(min, 10), $lte: parseInt(max, 10) };
      } else if (this.queryStr[filterName] && Filters[filterName].type === 'select') {
        queryCopy[filterName] = this.queryStr[filterName];
      }
    });

    this.query = this.query.find(queryCopy);
    this.queryCount = this.query.clone();

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
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }

  populate(args) {
    this.query.populate(args);
    return this;
  }
}

export default Features;
