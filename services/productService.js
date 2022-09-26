const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 50;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        categoryId: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
    })};
  };


  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      isBlock: faker.datatype.boolean(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }




  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.products) {
          throw boom.notFound('product not found')
        }
        resolve(this.products)
      }, 1000);
    });
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async findOnes(categoryId, id){
    const product = this.products.find(item => item.categoryId === categoryId && item.id === id);
    if (!product) {
      throw boom.notFound('product not found')
    }
    return product;
  }


  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]
  }

  async updateTwo(categoryId, id, changes){
    const index = this.products.findIndex(item => item.categoryId === categoryId && item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]
  }



  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
