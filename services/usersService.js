const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        usersId: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    })};
  };


  async create(data){
    const newUsers = {
      userId: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUsers);
    return newUsers;
  }


  async find(){
    if (!this.users) {
      throw boom.notFound('user not found')
    }
    return this.users;
  }

  async findOne(usersId){
    const user = this.users.find(item => item.usersId === usersId);
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user;
  }




  async update(userId, changes){
    const index = this.users.findIndex(item => item.userId === userId);
    if (index === -1) {
       throw boom.notFound('user not found')
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index]
  }



  async delete(usersId){
    const index = this.users.findIndex(item => item.usersId === usersId);
    if (index === -1) {
      throw boom.notFound('user not found')
    }
    this.users.splice(index, 1);
    return { usersId };
  }
}

module.exports = UsersService;
