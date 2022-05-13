class Entity {
  constructor(name) {
    this.name = name;
    }

}


class User extends Entity {
  constructor(name) {
    super(name);
    }

    greet() {
      console.log('My name is ' + this.name + ', hello!');
    }
}

class Box extends Entity {

  constructor(name, volume, owner) {
    super(name);
    this.volume = volume;
    this.owner = owner;
    this.content = [];
    }

    store(inner) {
      if(this.volume >= inner.findSize()) {
        this.content.push(inner);
        console.log(this.name + ' belongs to ' + this.owner.name + ' and contains ' + this.content.length + ' - ' + this.content[this.content.length - 1].name);
      } else {
        console.log(this.name + ' that belongs to ' + this.owner.name +  ' can\'t contain ' + inner.name + ' because of its size');
      }

      return this.name + ' contain just ' + this.content.length + ' thing(s)';
    }
}

class Stuff extends Entity {

  constructor(name, length, width, height) {
    super(name);
    this.length = length;
    this.width = width;
    this.height = height;
    }

    findSize() {
      let size = this.length * this.width * this.height;
      return size;
    }

    renderMessage() {
      console.log('The ' + this.name + ' has volume ' + this.findSize());
    }
}

const ann = new User('Ann');
const peter = new User('Peter');

ann.greet();
peter.greet();


const book1 = new Stuff('"Peter Pan" book', 25, 20, 4);
const book2 = new Stuff('"The Wonderful Wizard of Oz" book', 30, 24, 5);
const book3 = new Stuff('"Winnie-the-Pooh" book', 20, 15, 6);
const book4 = new Stuff('"Harry Potter and the Philosopher’s Stone" book', 33, 26, 3);
const book5 = new Stuff('"The Adventures of Sherlock Holmes" book', 21, 15, 3);
const book6 = new Stuff('"The Adventures of Tom Sawyer" book', 20, 15, 3);
const book7 = new Stuff('"Robin Hood" book', 25, 20, 3);
const book8 = new Stuff('"Tales" book', 22, 15, 6);


// book1.renderMessage();
// book2.renderMessage();
// book3.renderMessage();
// book4.renderMessage();
// book5.renderMessage();
// book6.renderMessage();
// book7.renderMessage();
// book8.renderMessage();


const box1 = new Box('Grey box', 5000, ann);
const box2 = new Box('Little red box', 150, ann);
const box3 = new Box('Brown box', 3000, ann);
const box4 = new Box('Paper box', 1500, peter);
const box5 = new Box('Huge box', 9500, peter);

// console.log(box1.store(book1));
// console.log(box1.store(book4));
// console.log(box2.store(book2));
// console.log(box2.store(book5));
// console.log(box3.store(book2));
// console.log(box3.store(book3));
// console.log(box3.store(book1));
// console.log(box4.store(book2));
// console.log(box4.store(book6));
console.log(box5.store(book3));
console.log(box5.store(book7));
console.log(box5.store(book8));

function renderContent(container) {
  container.content.forEach(element => {
    console.log(element.name + ' is in ' + container.name);
  });
}

// renderContent(box1);
// renderContent(box2);
// renderContent(box3);
// renderContent(box4);
renderContent(box5);
