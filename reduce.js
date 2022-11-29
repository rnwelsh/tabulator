
const fruitBasket = [
  'orange',
  'apple',
  'banana'
]

const hasFruit = fruit => fruitBasket.some(inBasket => inBasket.endsWith(fruit))

const testFruits = [
  'grapes',
  'ana',
  'Orange'
]


const intersect = (testCollection=[''], targetCollection=['']) => testCollection.some(testItem => targetCollection.some(targetItem => targetItem.endsWith(testItem)))

console.log(intersect(testFruits, fruitBasket))