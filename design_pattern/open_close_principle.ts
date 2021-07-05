/**
 * Search Products based on certain criteria.
 */

import { textChangeRangeIsUnchanged } from "typescript";

enum Color {
  red = 'red',
  green = 'green',
  blue = 'blud',
}

enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

class Product {
  constructor(public name: string, public color: Color, public size: Size) {}
}

// open for extension, closed for modification
// breaking the ocp by adding another filter here.
class ProductFilter {
  filterByColor(products: Product[], color: Color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products: Product[], size: Size) {
    return products.filter((p) => p.size === size);
  }

  filterByName(products: Product[], name: string) {
    return products.filter((p) => p.name === name);
  }

  filterByColorAndSize(products: Product[], color: Color, size: Size) {
    return products.filter((p) => p.color === color && p.size === size);
  }

  filterByColorAndName(products: Product[], color: Color, name: string) {
    return products.filter((p) => p.color === color && p.name === name);
  }

  filterBySizeAndName(products: Product[], size: Size, name: string) {
    return products.filter((p) => p.size === size && p.name === name);
  }

  filterByColorAndSizeAndName(
    products: Product[],
    color: Color,
    size: Size,
    name: string
  ) {
    return products.filter(
      (p) => p.color === color && p.size === size && p.name === name
    );
  }

  // or conditinos more....
}

const apple = new Product("Apple", Color.green, Size.small);
const tree = new Product("Tree", Color.green, Size.large);
const house = new Product("House", Color.blue, Size.large);

const products = [apple, tree, house];

console.log('All the products: \n',products, '\n')

let pf = new ProductFilter();
console.log(`Green products (anti-pattern):`);
for (const p of pf.filterByColor(products, Color.green)) {
  console.log(` * ${p.name} is green`);
}

// Specification Pattern
abstract class Specification {
  abstract isSatisfied(item: Product): boolean;
}

class ColorSpecification extends Specification {
  constructor(public color: Color) {
    super();
  }

  isSatisfied(item: Product) {
    return this.color === item.color;
  }
}

class SizeSpecification extends Specification {
  constructor(public size: Size) {
    super();
  }

  isSatisfied(item: Product) {
    return this.size === item.size;
  }
}

class NameSpecification extends Specification {
  constructor(public name: string) {
    super();
  }

  isSatisfied(item: Product) {
    return this.name === item.name;
  }
}

class BetterFilter {
  filter(items: Product[], spec: Specification): Product[] {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

class AndSpecification extends Specification {
  specs: Specification[];
  constructor(...specs: Specification[]) {
    super();
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.every((spec) => spec.isSatisfied(item));
  }
}

class OrSpecification extends Specification {
  specs: Specification[];
  constructor(...specs: Specification[]) {
    super();
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.some((spec) => spec.isSatisfied(item));
  }
}

const bf = new BetterFilter();
console.log(`\nGreen products (specification pattern):`);
for (const p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log('\n filter both Green and Large')
for (const p of bf.filter(
  products,
  new AndSpecification(new ColorSpecification(Color.green), new SizeSpecification(Size.large))
)) {
  console.log(` * ${p.name} is green and its size is ${p.size}`);
}

console.log('\n filter Blue or Small')
for (const p of bf.filter(
  products,
  new OrSpecification(new ColorSpecification(Color.blue), new SizeSpecification(Size.small))
)) {
  console.log(` * ${p.name} is ${p.color} and its size is ${p.size}`);
}
