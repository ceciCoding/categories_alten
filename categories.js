const categories = [
  {
    name: 'category1',
    subcategories: [
      {
        name: 'category2',
        subcategories: []
      },
      {
        name: 'category3',
        subcategories: [
          {
            name: 'category4',
            subcategories: []
          }
        ]
      }
    ]
  },
  {
    name: 'category5',
    subcategories: []
  }
];

let pathCache = {};

const validateInputs = (categories, categoryName) => {
  const checks = [
    { test: () => categories && categoryName, message: 'Missing required params' },
    { test: () => Array.isArray(categories), message: 'Categories must be an array' },
    { test: () => typeof categoryName === "string", message: 'Category name must be a string' },
  ];

  for (const { test, message } of checks) {
    if (!test()) {
      throw new Error(message);
    }
  }

  return true;
}

// TO-DO: Implement this function
const getCategoryPath = (categories, categoryName) => {
  let path;

  validateInputs(categories, categoryName)

  if (pathCache[categoryName]) return pathCache[categoryName];

  function findPath(categories, currentPath) {
    for (let category of categories) {
      let newPath = `${currentPath}/${category.name}`;
      if (category.name === categoryName) {
        return newPath;
      }

      if (category.subcategories.length > 0) {
        let subPath = findPath(category.subcategories, newPath);
        if (subPath) return subPath;
      }
    }

    return null;
  }

  path = findPath(categories, '');

  if (path) pathCache[categoryName] = path;

  return path;
}

// OUTPUT SAMPLES
console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
console.log(getCategoryPath(categories, 'category5')); // should output: '/category5'
console.log(getCategoryPath([], 123)); // should output: null

