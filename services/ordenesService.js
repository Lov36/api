const faker = require('faker');
const boom = require('@hapi/boom');

class OrdenesService {

  constructor(){
    this.ordenes = [];
    this.generate();
  }

  async generate() {
    const limit = 30;
    for (let i = 0; i < limit; i++) {
      this.ordenes.push({
        ordenId: faker.datatype.uuid(),
        userId: faker.datatype.uuid(),
        number: parseInt(faker.commerce.price(), 10),
        name: faker.name.findName()
    })};
  };


  async create(data){
    const newOrdenes = {
      ordenId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      ...data
    }
    this.ordenes.push(newOrdenes);
    return newOrdenes;
  }




  async find(){
    if (!this.ordenes) {
      throw boom.notFound('orden not found')
    }
    return this.ordenes;
  }


  async findOne(ordenId){
    const orden = this.ordenes.find(item => item.ordenId === ordenId);
    if (!orden) {
      throw boom.notFound('orden not found')
    }
    return orden;
  }


  async findTwo(ordenId, userId){
    const orden = this.ordenes.find(item => item.userId === userId && item.ordenId === ordenId);
    if (!orden) {
      throw boom.notFound('orden not found')
    }
    return orden;
  }


  async updateTwo(ordenId, changes){
    const index = this.ordenes.findIndex(item => item.ordenId === ordenId);
    if (index === -1) {
      throw boom.notFound('orden not found')
    }
    const orden = this.ordenes[index];
    this.ordenes[index] = {
      ...orden,
      ...changes
    };
    return this.ordenes[index]
  }


  async updateThree(ordenId, userId, changes){
    const index = this.ordenes.findIndex(item => item.userId === userId && item.ordenId === ordenId);
    if (index === -1) {
      throw boom.notFound('orden not found')
    }
    const orden = this.ordenes[index];
    this.ordenes[index] = {
      ...orden,
      ...changes
    };
    return this.ordenes[index]
  }




  async delete(ordenId){
    const index = this.ordenes.findIndex(item => item.ordenId === ordenId);
    if (index === -1) {
      throw boom.notFound('orden not found')
    }
    this.ordenes.splice(index, 1);
    return { ordenId };
  }
}

module.exports = OrdenesService;
