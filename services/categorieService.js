const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor(){
    this.categories = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        categoryId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
    })};
  };

  async create(data){
    const newCategories = {
      categoryId: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategories);
    return newCategories;
  }

  async find(){
    if (!this.categories) {
      throw boom.notFound('categories not found');
    }
    return this.categories;
  }

  async findOne(categoryId){
    const category = this.categories.find(item => item.categoryId === categoryId);
    if (!category) {
      throw boom.notFound('categories not found');
    }
    return category;
  }




  async update(categoryId, changes){
    const index = this.categories.findIndex(item => item.categoryId === categoryId);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index]
  }



  delete(categoryId){
    const index = this.categories.findIndex(item => item.categoryId === categoryId);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    this.categories.splice(index, 1);
    return { categoryId };
  }

}

module.exports = CategoriesService;
