/* ДЗ 2 - работа с массивами и объектами */

/*
  Задание 1:

  Напишите аналог встроенного метода forEach для работы с массивами
  Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

  Пример:
  forEach([1, 2, 3], (el) => console.log(el))
 */

function forEach(array, fn) {
  let i;
  let length = array.length;
  for (i = 0; i < length; i = i + 1) {
    fn(array[i], i, array);
  }  
}


/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  let i;
  let length = array.length;
  let results = [];

  for (i = 0; i < length; i++) {
    results.push(fn.call(null, array[i], i, array));
  }  

  return results;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  if (initial === undefined) {
    let result = array[0];
    for (let i = 1; i < array.length; i = i + 1) {
      result = fn.call(null, result, array[i], i, array);
    }
    return result;
  } else {
    let result = initial;
    for (let i = 0; i < array.length; i = i + 1) {
      result = fn.call(null, result, array[i], i, array);
    }
    return result;
  }  
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
  upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let namesObj = Object.getOwnPropertyNames(obj);
  // console.log(namesObj)
  let results = [];
  
  for (let i = 0; i < namesObj.length; i++) {
    results.push(namesObj[i].toUpperCase());
  }

  return results;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  let obj = {};
  
}

export { forEach, map, reduce, upperProps, createProxy };
